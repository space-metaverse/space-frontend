import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useGetAllRoomsQuery } from "../../api/space";
import SpaceCard from "../SpaceCard";

const Spaces = () => {
  const { data, error, isLoading } = useGetAllRoomsQuery({});

  return (
    <Box pt={3}>
      <Typography
        variant="h2"
        align="center"
        p={3}
        fontWeight={500}
        sx={{
          border: "3px solid #111114",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Featured Spaces
      </Typography>
      <Grid container pt={2} spacing={3}>
        {data?.data
          ?.filter((r) => r.allow_promotion)
          .slice(0, 8)
          ?.map((space, index) => (
            <Grid xs={12} md={3} key={space.hub_id + index}>
              <SpaceCard
                key={space.hub_id}
                hubId={space.hub_id}
                title={space.name}
                owner={String(space.created_by_username)}
                image={space.screenshot_url}
                description={space.description}
                categories={space.categories}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Spaces;
