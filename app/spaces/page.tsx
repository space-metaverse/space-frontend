"use client";
import SpaceCard from "../../components/SpaceCard";
import { useGetAllRoomsQuery } from "../../api/space";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography, Box, CircularProgress, Stack } from "@mui/material";

const Spaces = () => {
  const { data, error, isLoading } = useGetAllRoomsQuery({});

  return (
    <Box pl={3} pr={3} pb={4} sx={{ minHeight: "80%" }}>
      <Typography variant="h2" align="center" p={3} fontWeight={500}>
        All Spaces
      </Typography>
      <Grid container spacing={3}>
        {isLoading ? (
          <Stack alignItems="center" width="100%" p={8}>
            <CircularProgress />
          </Stack>
        ) : (
          data?.data?.map((space, index) => (
            <Grid xs={12} md={3} key={space.hub_id + index}>
              <SpaceCard
                key={space.hub_id}
                hubId={space.hub_id}
                title={space.name}
                owner={space.commerce_type}
                image={space.screenshot_url}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Spaces;
