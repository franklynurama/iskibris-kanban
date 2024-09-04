export * from "./statuses";
export * from "./ApplicationCard";
export * from "./ApplicationColumn";
export * from "./index";
export * from "./ApplicationListContent";

interface Place {
  id: number;
  slug: string;
  title: string;
}

interface EducationDetail {
  id: number;
  degree_name: string;
  school_name_tr: string;
  school_name_en: string;
  end_month: number;
  end_year: number;
}

interface Folder {
  id: number;
  name: string;
  files: string[];
}

export interface Post {
  id: number;
  name: string;
  email: string;
  user_id: number;
  phone_number: string;
  resume_url: string;
  city_id: number;
  place_id: number;
  place: Place;
  work_permit_id: number;
  education_details: EducationDetail[];
  education_level_id: number;
  military_status: number;
  gender: string;
  birthdate: string | null;
  stage_id: number;
  stage_id_enum: string;
  rating_id: number;
  comments: Comment[];
  folders: Folder[];
  fields_of_study: number[];
  driver_licences: string[] | null;
  job_id: number;
  job_title: string;
  job_city_id: number;
  job_place_id: number;
  job_place_name: string;
  company_id: number;
  company_name: string;
  cover_letter: string | null;
  manually_created_by: string | null;
  manually_created_at: string | null;
  created_at: string;
}
