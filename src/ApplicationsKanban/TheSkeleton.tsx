import {
  Box,
  Card,
  CardContent,
  CardActions,
  Skeleton,
  Stack,
  Divider,
} from "@mui/material";

const TheSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Box key={index} sx={{ marginBottom: 1, minWidth: 240 }}>
          <Card
            style={{
              maxWidth: 240,
              height: 200,
              borderRadius: 10,
            }}
            elevation={1}
          >
            <CardContent>
              <Stack direction={"row"} spacing={3}>
                <Skeleton variant="circular" width={40} height={40} />
                <Stack>
                  <Skeleton variant="text" width={80} height={25} />
                  <Skeleton variant="text" width={50} height={20} />
                </Stack>
              </Stack>

              <Skeleton
                sx={{ paddingTop: 2 }}
                variant="text"
                width="100%"
                height={20}
              />
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Skeleton variant="text" width="50%" height={20} />
            </CardContent>
            <CardActions>
              <Box sx={{ marginLeft: 5, marginTop: -2 }}>
                <Skeleton variant="rectangular" width={80} height={30} />
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default TheSkeleton;
