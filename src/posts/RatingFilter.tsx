// RatingFilter.js
import * as React from "react";
import { useListContext } from "react-admin";
import Rating from "@mui/material/Rating";
import { Box, Typography } from "@mui/material";

const RatingFilter = () => {
  const { filterValues, setFilters } = useListContext();
  const handleChange = (event, newValue) => {
    setFilters({ ...filterValues, rating_id: newValue });
  };

  return (
    <Box m={2}>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="rating-filter"
        value={filterValues.rating_id || 0}
        onChange={handleChange}
      />
    </Box>
  );
};

export default RatingFilter;
