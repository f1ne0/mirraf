import { supabase } from "./client";

export const PROJECTS_BUCKET = "projects";
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateImageFile(file: File) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Поддерживаются только JPG, PNG и WEBP.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Максимальный размер файла 5MB.");
  }
}

function getFileExtension(file: File) {
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

export function getProjectImagePath(
  userId: string,
  projectId: string,
  type: "design" | "result",
  file: File,
) {
  const extension = getFileExtension(file);
  return `${userId}/${projectId}/${type}.${extension}`;
}

export function getPublicProjectImageUrl(path: string) {
  const { data } = supabase.storage.from(PROJECTS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadProjectImage(params: {
  userId: string;
  projectId: string;
  type: "design" | "result";
  file: File;
}) {
  const { userId, projectId, type, file } = params;

  validateImageFile(file);

  const path = getProjectImagePath(userId, projectId, type, file);

  const { error } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
      cacheControl: "3600",
    });

  if (error) {
    throw error;
  }

  return {
    path,
    url: getPublicProjectImageUrl(path),
  };
}

export async function removeProjectImages(
  paths: Array<string | null | undefined>,
) {
  const validPaths = paths.filter(Boolean) as string[];

  if (validPaths.length === 0) {
    return;
  }

  const { error } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .remove(validPaths);

  if (error) {
    throw error;
  }
}
