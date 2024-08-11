import type { Post } from ".";

export const statuses: Post["stage_id_enum"][] = [
  "NEW",
  "RESUME_SCREENING",
  "WAITING_FOR_INTERVIEW",
  "WAITING_FOR_JOB_SEEKER",
  "TO_INTERVIEW_IN_PERSON",
  "REFERENCES_AND_BACKGROUND_CHECK",
  "FINAL_DECISION_WAITING_LIST",
  "JOB_OFFERING",
  "REJECTED",
  "CANDIDATE_WITHDREW",
  "HIRED",
];

export const statusNames: Record<Post["stage_id_enum"], string> = {
  NEW: "New",
  RESUME_SCREENING: "Resume Screening",
  WAITING_FOR_INTERVIEW: "Waiting for Interview",
  WAITING_FOR_JOB_SEEKER: "Waiting for Job Seeker",
  TO_INTERVIEW_IN_PERSON: "To interview In Person",
  REFERENCES_AND_BACKGROUND_CHECK: "References and Background Check",
  FINAL_DECISION_WAITING_LIST: "Final Decision Waiting List",
  JOB_OFFERING: "Job Offering",
  REJECTED: "Rejected",
  CANDIDATE_WITHDREW: "Candidate Withdrew",
  HIRED: "Hired",
};

export type PostsByStatus = Record<(typeof statuses)[number], Post[]>;

export const getPostsByStatus = (unorderedPosts: Post[]) => {
  const postsByStatus: PostsByStatus = unorderedPosts.reduce(
    (acc, post) => {
      const upperCaseStatus = post.stage_id_enum.toUpperCase();
      if (!acc[upperCaseStatus]) {
        acc[upperCaseStatus] = [];
      }
      acc[upperCaseStatus].push(post);
      return acc;
    },
    statuses.reduce(
      (obj, status) => ({ ...obj, [status]: [] }),
      {} as PostsByStatus
    )
  );
  // order each column by id
  statuses.forEach((status) => {
    postsByStatus[status] = postsByStatus[status].sort(
      (recordA: Post, recordB: Post) => recordA.id - recordB.id
    );
  });
  return postsByStatus;
};
