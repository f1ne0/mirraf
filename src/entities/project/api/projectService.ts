import { supabase } from '../../../shared/lib/supabase/client';
import {
  removeProjectImages,
  uploadProjectImage,
} from '../../../shared/lib/supabase/storage';
import { ProjectCategory } from '../model/categories';
import { mapProjectRow, Project } from '../model/types';

export type ProjectPayload = {
  title: string;
  address: string;
  category: ProjectCategory;
  price: number;
  panoramaUrl: string;
  isPublished: boolean;
  designImage?: File | null;
  resultImage?: File | null;
};

async function requireUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('Пользователь не авторизован.');
  }

  return data.user;
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map(mapProjectRow);
}

export async function getPublishedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map(mapProjectRow);
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapProjectRow(data) : null;
}

export async function createProject(payload: ProjectPayload): Promise<Project> {
  const user = await requireUser();

  if (!payload.designImage || !payload.resultImage) {
    throw new Error('Нужно загрузить оба изображения.');
  }

  const projectId = crypto.randomUUID();
  let designPath: string | null = null;
  let resultPath: string | null = null;

  try {
    const designUpload = await uploadProjectImage({
      userId: user.id,
      projectId,
      type: 'design',
      file: payload.designImage,
    });

    designPath = designUpload.path;

    const resultUpload = await uploadProjectImage({
      userId: user.id,
      projectId,
      type: 'result',
      file: payload.resultImage,
    });

    resultPath = resultUpload.path;

    const { data, error } = await supabase
      .from('projects')
      .insert({
        id: projectId,
        title: payload.title,
        address: payload.address,
        category: payload.category,
        price: payload.price,
        design_image_url: designUpload.url,
        result_image_url: resultUpload.url,
        design_image_path: designUpload.path,
        result_image_path: resultUpload.path,
        panorama_url: payload.panoramaUrl || null,
        is_published: payload.isPublished,
        user_id: user.id,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return mapProjectRow(data);
  } catch (error) {
    await removeProjectImages([designPath, resultPath]).catch(() => undefined);
    throw error;
  }
}

export async function updateProject(id: string, payload: ProjectPayload): Promise<Project> {
  const user = await requireUser();
  const current = await getProjectById(id);

  if (!current) {
    throw new Error('Проект не найден.');
  }

  let designImageUrl = current.designImage;
  let resultImageUrl = current.resultImage;
  let designImagePath = current.designImagePath;
  let resultImagePath = current.resultImagePath;

  if (payload.designImage) {
    const uploaded = await uploadProjectImage({
      userId: user.id,
      projectId: id,
      type: 'design',
      file: payload.designImage,
    });

    designImageUrl = uploaded.url;
    designImagePath = uploaded.path;
  }

  if (payload.resultImage) {
    const uploaded = await uploadProjectImage({
      userId: user.id,
      projectId: id,
      type: 'result',
      file: payload.resultImage,
    });

    resultImageUrl = uploaded.url;
    resultImagePath = uploaded.path;
  }

  const { data, error } = await supabase
    .from('projects')
    .update({
      title: payload.title,
      address: payload.address,
      category: payload.category,
      price: payload.price,
      design_image_url: designImageUrl,
      result_image_url: resultImageUrl,
      design_image_path: designImagePath,
      result_image_path: resultImagePath,
      panorama_url: payload.panoramaUrl || null,
      is_published: payload.isPublished,
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapProjectRow(data);
}

export async function setProjectPublished(id: string, isPublished: boolean): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update({
      is_published: isPublished,
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapProjectRow(data);
}

export async function deleteProject(id: string) {
  const current = await getProjectById(id);

  if (!current) {
    return;
  }

  await removeProjectImages([current.designImagePath, current.resultImagePath]);

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    throw error;
  }
}
