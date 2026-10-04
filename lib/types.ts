export const CATEGORIES = [
  "College ID",
  "Marksheets",
  "Certificates",
  "Resume",
  "Project Files",
  "Internship Documents",
  "Other",
] as const;

export type Category = typeof CATEGORIES[number];

export interface DocumentRow {
  id: string;
  user_id: string;
  name: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  category: Category;
  tags: string[];
  expiry_date: string | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  student_id: string | null;
  college: string | null;
  course: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  emergency_contact: string | null;
  notes: string | null;
}