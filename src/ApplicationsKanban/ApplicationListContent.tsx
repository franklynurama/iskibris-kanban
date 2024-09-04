import React from "react";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import type { Post } from "./types";
import { PostsByStatus, getPostsByStatus, statuses } from "./types";
import { ApplicationColumn } from "./ApplicationColumn";

interface Props {
  posts: Array<Post>;
  refetch: () => void;
  onPreviewApplication?: (application: Post) => void;
  onLoadMore?: () => void; // Callback to load more posts when scrolling
  onApplicationStatusChanged?: (
    application: Post,
    newStatus: string
  ) => Promise<void>;
}

// Update this function to return a simple function
const useUpdatePostStatus = (testMode: boolean) => {
  return async (source: Post, destination: Post): Promise<void> => {
    if (testMode) {
      // Simulate a successful update without a real API call
      console.log("Test mode enabled: Simulating successful status update.");
      return;
    }

    try {
      // Implement the updatePostStatus logic here
      const response = await fetch(
        "https://staging.iskibris.com/api/applications/test?page=1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source, destination }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post status");
      }
    } catch (error) {
      console.error("Error updating post status:", error);
      // Optionally handle the error, e.g., by showing a notification
    }
  };
};

export const ApplicationListContent: React.FC<Props> = ({
  posts,
  refetch,
  onPreviewApplication,
  onLoadMore,
  onApplicationStatusChanged,
}) => {
  console.log("The Data:", posts);
  const testMode = true; // Set to true to enable test mode, false for actual API calls
  const updatePostStatus = useUpdatePostStatus(testMode);

  const [postsByStatus, setPostsByStatus] = useState<PostsByStatus>(
    getPostsByStatus([])
  );

  useEffect(() => {
    if (posts) {
      const newPostsByStatus = getPostsByStatus(posts);
      if (!isEqual(newPostsByStatus, postsByStatus)) {
        setPostsByStatus(newPostsByStatus);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, postsByStatus]);

  const mutation = useMutation(
    async ({ source, destination }: { source: Post; destination: Post }) =>
      updatePostStatus(source, destination),
    { onSettled: () => refetch?.() } // Safe-call refetch if it's provided
  );

  // Scroll event listener to detect when user scrolls to the bottom of the page
  const handleScroll = React.useCallback(() => {
    // Check if user has scrolled close enough to the bottom
    const scrollThreshold = 50; // Pixels from the bottom of the page
    const position =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - scrollThreshold;

    if (position && onLoadMore) {
      onLoadMore(); // Trigger loading more posts
    }
  }, [onLoadMore]);

  // Debounce the scroll handler to avoid unnecessary calls
  useEffect(() => {
    const debouncedHandleScroll = () => {
      setTimeout(() => {
        handleScroll();
      }, 150);
    };

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [handleScroll]);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as Post["stage_id_enum"];
    const destinationStatus = destination.droppableId as Post["stage_id_enum"];
    const sourcePost = postsByStatus[sourceStatus][source.index]!;
    const destinationPost = postsByStatus[destinationStatus][
      destination.index
    ] ?? {
      status: destinationStatus,
      index: undefined, // undefined if dropped after the last item
    };

    // compute local state change synchronously
    setPostsByStatus(
      updatePostStatusLocal(
        sourcePost,
        { status: sourceStatus, index: source.index },
        { status: destinationStatus, index: destination.index },
        postsByStatus
      )
    );

    // trigger the mutation to persist the changes
    mutation.mutateAsync({
      source: sourcePost,
      destination: destinationPost,
    });

    // Call the onApplicationStatusChanged prop
    if (onApplicationStatusChanged) {
      onApplicationStatusChanged(sourcePost, destinationStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex">
        {statuses.map((status) => (
          <ApplicationColumn
            status={status}
            posts={postsByStatus[status]}
            key={status}
            onPreviewApplication={onPreviewApplication}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};

const updatePostStatusLocal = (
  sourcePost: Post,
  source: { status: Post["stage_id_enum"]; index: number },
  destination: {
    status: Post["stage_id_enum"];
    index?: number; // undefined if dropped after the last item
  },
  postsByStatus: PostsByStatus
) => {
  if (source.status === destination.status) {
    // moving deal inside the same column
    const column = postsByStatus[source.status];
    column.splice(source.index, 1);
    column.splice(destination.index ?? column.length + 1, 0, sourcePost);
    return {
      ...postsByStatus,
      [destination.status]: column,
    };
  } else {
    // moving deal across columns
    const sourceColumn = postsByStatus[source.status];
    const destinationColumn = postsByStatus[destination.status];
    sourceColumn.splice(source.index, 1);
    destinationColumn.splice(
      destination.index ?? destinationColumn.length + 1,
      0,
      sourcePost
    );
    return {
      ...postsByStatus,
      [source.status]: sourceColumn,
      [destination.status]: destinationColumn,
    };
  }
};
