import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Stack, Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Post } from ".";
import BasicRating from "./BasicRating";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "66%",
  height: "80%", // Adjust the height as needed
  borderRadius: 5,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 0,
  overflowY: "auto", // Add vertical scroll
};

export const Details = ({ post }: { post: Post }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} endIcon={<VisibilityIcon />}>
        Show Details{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        elevation={5}
      >
        <Box sx={style}>
          <Stack
            direction={"row"}
            sx={{
              marginTop: 3,
              marginBottom: 1,
              marginLeft: 5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Avatar src={post.image} sx={{ width: 200, height: 200 }}></Avatar>
            <Stack direction={"column"}>
              <Typography variant="h2">{post.name}</Typography>
              <Typography variant="h5">{post.job_title}</Typography>
              <BasicRating value={post.rating_id} />
            </Stack>
            <Stack direction={"column"} sx={{ marginRight: 2 }}>
              <Typography variant="h5">
                Address:
                <br />
                29th Leva Land, Europe 6F
              </Typography>
              <Typography variant="h5">
                Phone:
                <br /> +234 802 546 76
              </Typography>
              <Typography variant="h5">
                Email:
                <br /> example@domain.com
              </Typography>
            </Stack>
          </Stack>

          <Typography
            variant="h5"
            sx={{ paddingLeft: 2, paddingTop: 2, fontWeight: 500 }}
          >
            {" "}
            Skill Highlight
          </Typography>
          <Divider />
          <Typography variant="h6">
            <Stack direction={"row"} spacing={20} sx={{ marginTop: 2 }}>
              <ul>
                <li>Complex Problem Solver</li>
                <li>Project Management</li>
                <li>Decision Maker</li>
              </ul>
              <ul>
                <li>Team Player</li>
                <li>Presentation Skills</li>
              </ul>
            </Stack>
          </Typography>

          <Typography
            variant="h5"
            sx={{ paddingLeft: 2, paddingTop: 2, fontWeight: 500 }}
          >
            {" "}
            Experience
          </Typography>
          <Divider />
          <Typography variant="h6" sx={{ paddingLeft: 2 }}>
            {post.job_title} - 01/2020 to 11/2023 <br />
            <ul>
              <li>
                Developed and maintained complex web applications using
                JavaScript, React, Node.js, and MongoDB, ensuring high
                performance and responsiveness to user interactions.
              </li>
              <li>
                Implemented RESTful APIs to connect front-end applications with
                back-end services, facilitating seamless data exchange and
                improving user experience.
              </li>
              <li>
                Designed and developed user interfaces using HTML, CSS, and
                JavaScript, focusing on mobile-first design principles.
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h5"
            sx={{ paddingLeft: 2, paddingTop: 2, fontWeight: 500 }}
          >
            {" "}
            Education
          </Typography>
          <Divider />
          <Typography variant="h6" sx={{ paddingLeft: 2 }}>
            {post.education_level}
            <br />
            {post.university}
          </Typography>

          <Typography
            variant="h5"
            sx={{ paddingLeft: 2, paddingTop: 2, fontWeight: 500 }}
          >
            {" "}
            Languages
          </Typography>
          <Divider />
          <Typography variant="h6" sx={{ paddingLeft: 2 }}>
            French-A1
            <br />
            English-B2
          </Typography>

          <Typography
            variant="h5"
            sx={{ paddingLeft: 2, paddingTop: 2, fontWeight: 500 }}
          >
            {" "}
            Certification
          </Typography>
          <Divider />
          <Typography variant="h6" sx={{ paddingLeft: 2, listStyle: "none" }}>
            <ul>
              <li>Basics of Programming</li>
              <li>PHP Framework</li>
              <li>Web Design</li>
              <li>API Integration</li>
              <li>Back-End Development</li>
              <li>Advanced CSS Techniques</li>
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
