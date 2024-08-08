export * from "./statuses";
export * from "./PostCard";
export * from "./PostColumn";
export * from "./PostList";
export * from "./PostListContent";

export interface Post {
  id: number; 
  name: string;
  image: string;
  status: "new" | "resume_screening" | "waiting_for_Interview" | "waiting_for_job_seeker"|
          "to_interview_in_person"| "references_and_background_check"| "final_decision_waiting_list"|
          "job_offering"| "rejected"| "candidate_withdrew"| "hired";
  job_title: string;
  residency_status: string;
  education_level: string;
  gender: string;
  location: string;
  age: number;
  date_of_application: string;
  rating: number;
  university: string;
  index: number;
}
