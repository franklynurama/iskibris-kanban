import { Droppable } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";

import type { Post } from ".";
import { statusNames } from ".";
import { PostCard } from "./PostCard";

export const PostColumn = ({
  status,
  posts,
}: {
  status: Post["stage_id_enum"];
  posts: Post[];
}) => (
  <Box
    sx={{
      flex: 1,
      paddingTop: "8px",
      paddingBottom: "16px",
      bgcolor: "#eaeaee",
      "&:first-of-type": {
        paddingLeft: "5px",
        borderTopLeftRadius: 5,
      },
      "&:last-child": {
        paddingRight: "5px",
        borderTopRightRadius: 5,
      },
    }}
  >
    <Box sx={{ height: 60, borderRadius: 5, width: 240, flexShrink: 0 }}>
      <Typography align="center" variant="subtitle1" sx={{ fontWeight: 500 }}>
        {statusNames[status]}
      </Typography>
    </Box>
    <Droppable droppableId={status}>
      {(droppableProvided, snapshot) => (
        <Box
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            padding: "5px",
            "&.isDraggingOver": {
              bgcolor: "#dadadf",
            },
          }}
        >
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
          {droppableProvided.placeholder}
        </Box>
      )}
    </Droppable>
  </Box>
);
