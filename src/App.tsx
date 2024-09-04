import React from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import ApplicationsKanban from "./ApplicationsKanban";
import { fetchApplications } from "./ApplicationsKanban/api";
import TheSkeleton from "./ApplicationsKanban/TheSkeleton";

const FallbackForMobile = () => (
  <Typography mt={3} align="center">
    The Kanban board demo is not available on mobile
  </Typography>
);

export const App = () => {
  const [applications, setApplications] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true); // Loading state
  const [isSmall, setIsSmall] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsSmall(window.innerWidth < 600); // Adjust the width threshold as needed
    };

    checkScreenSize(); // Check initial size
    window.addEventListener("resize", checkScreenSize); // Add resize event listener

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup on unmount
    };
  }, []);

  React.useEffect(() => {
    const loadApplications = async () => {
      if (!isSmall) {
        try {
          const data = await fetchApplications();
          console.log("🚀 ~ loadApplications ~ data:", data);
          setApplications(data); // Update the state with fetched data
        } catch (error) {
          console.error("Failed to load applications:", error);
        } finally {
          setLoading(false); // Set loading to false once data is loaded or an error occurs
        }
      } else {
        setLoading(false); // No need to load applications if the screen is small
      }
    };

    loadApplications();
  }, [isSmall]); // Depend on isSmall to trigger data load when screen size changes

  const handleApplicationStatusUpdated = async (
    application: any,
    newStatus: any
  ) => {
    console.log("Application changed: ", application, newStatus);
  };

  const handleApplicationPreview = (application: any) => {
    console.log("Previewing application: ", application);
  };

  const columns = [
    { name: "NEW", label: "New" },
    { name: "RESUME_SCREENING", label: "Resume Screening" },
    { name: "WAITING_FOR_INTERVIEW", label: "Waiting for Interview" },
    { name: "WAITING_FOR_JOB_SEEKER", label: "Waiting for Job Seeker" },
    { name: "TO_INTERVIEW_IN_PERSON", label: "To Interview in Person" },
    {
      name: "REFERENCES_AND_BACKGROUND_CHECK",
      label: "References and Background Check",
    },
    {
      name: "FINAL_DECISION_WAITING_LIST",
      label: "Final Decision Waiting List",
    },
    { name: "JOB_OFFERING", label: "Job Offering" },
    { name: "REJECTED", label: "Rejected" },
    { name: "CANDIDATE_WITHDREW", label: "Candidate Withdrew" },
    { name: "HIRED", label: "Hired" },
  ];

  // Render skeletons while loading
  if (loading) {
    return (
      <Box display="flex">
        {columns.map((column) => (
          <Box key={column.name} sx={{ width: 300, marginRight: 2 }}>
            <Skeleton variant="text" height={40} />
            <TheSkeleton />
            <Skeleton variant="text" height={20} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <div>
      {isSmall ? (
        <FallbackForMobile />
      ) : (
        <ApplicationsKanban
          items={applications}
          columns={columns}
          onPreviewApplication={handleApplicationPreview}
          onApplicationStatusChanged={handleApplicationStatusUpdated}
          onLoadMore={() => {
            console.log("More items loaded!");
          }}
        />
      )}
    </div>
  );
};
