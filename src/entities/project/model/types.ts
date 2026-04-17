import { Database } from '../../../shared/lib/supabase/database.types';
import { isProjectCategory, ProjectCategory } from './categories';

export type ProjectRow = Database['public']['Tables']['projects']['Row'];

export type Project = {
  id: string;
  title: string;
  address: string;
  category: ProjectCategory;
  price: number;
  designImage: string;
  resultImage: string;
  designImagePath: string;
  resultImagePath: string;
  panoramaUrl: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    address: row.address,
    category: isProjectCategory(row.category) ? row.category : 'other',
    price: row.price,
    designImage: row.design_image_url,
    resultImage: row.result_image_url,
    designImagePath: row.design_image_path,
    resultImagePath: row.result_image_path,
    panoramaUrl: row.panorama_url,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    userId: row.user_id,
  };
}
