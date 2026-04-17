export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          address: string;
          category: string;
          price: number;
          design_image_url: string;
          result_image_url: string;
          design_image_path: string;
          result_image_path: string;
          panorama_url: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          address: string;
          category?: string;
          price: number;
          design_image_url: string;
          result_image_url: string;
          design_image_path: string;
          result_image_path: string;
          panorama_url?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          address?: string;
          category?: string;
          price?: number;
          design_image_url?: string;
          result_image_url?: string;
          design_image_path?: string;
          result_image_path?: string;
          panorama_url?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
