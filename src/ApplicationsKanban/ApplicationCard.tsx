import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";

import { Details } from "./Details";
import type { Post } from "./types";

interface ApplicationCardProps {
  post: Post;
  index: number;
  onPreviewApplication?: (application: Post) => void; // Accept the prop
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  post,
  index,
  onPreviewApplication,
}) => {
  return (
    <Draggable draggableId={String(post.id)} index={index}>
      {(provided, snapshot) => (
        <Box
          sx={{ marginBottom: 1, minWidth: 240 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            style={{
              maxWidth: 240,
              height: 200,
              borderRadius: 10,
              opacity: snapshot.isDragging ? 0.9 : 1,
              transform: snapshot.isDragging ? "rotate(-2deg)" : "",
            }}
            elevation={snapshot.isDragging ? 3 : 1}
          >
            <CardContent>
              <Stack direction={"row"} spacing={3}>
                <Avatar
                  alt={post.name}
                  src={post.image}
                  sx={{ width: 40, height: 40 }}
                />
                <Stack>
                  <Typography variant="h6" component="div">
                    {post.name}
                  </Typography>
                  <Typography variant="subtitle1">{post.age} years</Typography>
                </Stack>
              </Stack>

              <Typography
                sx={{ paddingTop: 2 }}
                variant="subtitle1"
                component="div"
              >
                {post.job_title}
                <Divider orientation="vertical" variant="fullWidth" flexItem />
                {post.place.slug}
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ marginLeft: 5, marginTop: -2 }}>
                {/* <ShowButton resource="posts" record={post}  /> */}
                <Details
                  post={post}
                  onPreviewApplication={onPreviewApplication}
                />
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
