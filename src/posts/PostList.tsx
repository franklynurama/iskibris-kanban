import { List, Filter, SearchInput, SelectInput } from "react-admin";
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
    source="stage_id_enum"
    label="Status"
    choices={[
      { id: "NEW", name: "New" },
      { id: "RESUME_SCREENING", name: "Resume Screening" },
      { id: "WAITING_FOR_INTERVIEW", name: "Waiting for Interview" },
      { id: "WAITING_FOR_JOB_SEEKER", name: "Waiting for Job Seeker" },
      { id: "TO_INTERVIEW_IN_PERSON", name: "To interview In Person" },
      {
        id: "REFERENCES_AND_BACKGROUND_CHECK",
        name: "References and Background Check",
      },
      {
        id: "FINAL_DECISION_WAITING_LIST",
        name: "Final Decision Waiting List",
      },
      { id: "JOB_OFFERING", name: "Job Offering" },
      { id: "REJECTED", name: "Rejected" },
      { id: "CANDIDATE_WITHDREW", name: "Candidate Withdrew" },
      { id: "HIRED", name: "Hired" },
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
        sort={{ field: "id", order: "ASC" }}
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
