import { List, Filter, SearchInput, SelectInput, DateInput } from "react-admin";
import { useMediaQuery, Typography, Theme } from "@mui/material";
import { PostListContent } from ".";
import RatingFilter from "./RatingFilter";

const postFilters = [
  // eslint-disable-next-line react/jsx-key
  <SearchInput
    source="q"
    alwaysOn
    key="search-input"
    sx={{ marginBottom: "7px" }}
  />,
  <SelectInput
    source="status"
    choices={[
      { id: "new", name: "New" },
      { id: "resume_screening", name: "Resume Screening" },
      { id: "waiting_for_Interview", name: "Waiting for Interview" },
      { id: "waiting_for_job_seeker", name: "Waiting for Job Seeker" },
      { id: "to_interview_in_person", name: "To interview In Person" },
      {
        id: "references_and_background_check",
        name: "References and Background Check",
      },
      {
        id: "final_decision_waiting_list",
        name: "Final Decision Waiting List",
      },
      { id: "job_offering", name: "Job Offering" },
      { id: "rejected", name: "Rejected" },
      { id: "candidate_withdrew", name: "Candidate Withdrew" },
      { id: "hired", name: "Hired" },
    ]}
    alwaysOn
    key="status-select2"
  />,
  <SelectInput
    source="location"
    choices={[
      { id: "lefkosa", name: "Lefkosa" },
      { id: "guzelyurt", name: "Guzelyurt" },
      { id: "girne", name: "Girne" },
      { id: "maguza", name: "Maguza" },
      { id: "lefke", name: "Lefke" },
    ]}
    alwaysOn
    key="status-select3"
  />,
  <SelectInput
    source="residency_status"
    choices={[
      { id: "Work Visa", name: "Work Visa" },
      { id: "Permanent Residence", name: "Permanent Residence" },
      { id: "Citizen", name: "Citizen" },
    ]}
    alwaysOn
    key="status-select4"
  />,
  <SelectInput
    source="education_level"
    choices={[
      { id: "high school", name: "High school" },
      { id: "undergraduate", name: "Undergraduate" },
      { id: "graduate", name: "Graduate" },
      { id: "masters", name: "Masters" },
      { id: "PhD", name: "PhD" },
      { id: "Other", name: "Other" },
    ]}
    alwaysOn
    key="status-select5"
  />,
  <SelectInput
    source="gender"
    choices={[
      { id: "Male", name: "Male" },
      { id: "Female", name: "Female" },
      { id: "Rather not say", name: "Rather not say" },
    ]}
    alwaysOn
    key="status-select6"
  />,
  <SelectInput
    source="date_of_application"
    label="Date"
    choices={[
      { id: "today", name: "Today" },
      { id: "last_week", name: "Last Week" },
      { id: "last_two_weeks", name: "Last Two Weeks" },
      { id: "last_month", name: "Last Month" },
      { id: "last_year", name: "Last Year" },
      { id: "any_time", name: "Any Time" },
    ]}
    key="date-select"
    alwaysOn
  />,
  <RatingFilter label="Rating" key="rating-filter" alwaysOn />,
];

const PostFilter = (props) => <Filter {...props}>{postFilters}</Filter>;

export const PostList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <div>
      <List
        filters={<PostFilter />}
        perPage={100}
        sort={{ field: "index", order: "ASC" }}
        pagination={false}
        component="div"
      >
        {isSmall ? <FallbackForMobile /> : <PostListContent />}
      </List>
    </div>
  );
};

const FallbackForMobile = () => (
  <Typography mt={3} align="center">
    The Kanban board demo is not available on mobile
  </Typography>
);
