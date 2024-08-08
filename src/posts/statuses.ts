import type { Post } from ".";

export const statuses: Post["status"][] = [
  "new" , "resume_screening" , "waiting_for_Interview" , "waiting_for_job_seeker",
  "to_interview_in_person", "references_and_background_check", "final_decision_waiting_list",
  "job_offering", "rejected", "candidate_withdrew", "hired"
];

export const statusNames: Record<Post["status"], string> = {
  new: "New" ,
  resume_screening: "Resume Screening" ,
  waiting_for_Interview: "Waiting for Interview",
  waiting_for_job_seeker: "Waiting for Job Seeker",
  to_interview_in_person: "To interview In Person",
  references_and_background_check: "References and Background Check",
  final_decision_waiting_list: "Final Decision Waiting List",
  job_offering: "Job Offering",
  rejected: "Rejected",
  candidate_withdrew: "Candidate Withdrew",
  hired: "Hired",

};

export type PostsByStatus = Record<Post["status"], Post[]>;

export const getPostsByStatus = (unorderedPosts: Post[]) => {
  const postsByStatus: PostsByStatus = unorderedPosts.reduce(
    (acc, post) => {
      acc[post.status].push(post);
      return acc;
    },
    statuses.reduce(
      (obj, status) => ({ ...obj, [status]: [] }),
      {} as PostsByStatus
    )
  );
  // order each column by index
  statuses.forEach((status) => {
    postsByStatus[status] = postsByStatus[status].sort(
      (recordA: Post, recordB: Post) => recordA.index - recordB.index
    );
  });
  return postsByStatus;
};