"use client";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGetEventsBySpaceQuery, useGetSpaceQuery } from "../../../api/space";
import headerImage from "../../../public/space-header.png";
import nikeImage from "../../../public/nike.png";
import ProductCard from "../../../components/ProductCard";
import EventCard from "../../../components/EventCard";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";

const Spaces = () => {
  const pathname = usePathname();
  const hubId = pathname?.split("/")[2];

  const {
    data: spaceData,
    error: spaceError,
    isLoading: spaceLoading,
  } = useGetSpaceQuery({ hubId: String(hubId) }, { skip: !hubId });

  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsLoading,
  } = useGetEventsBySpaceQuery({ hubId: String(hubId) }, { skip: !hubId });

  return (
    <Box pb={4}>
      <Image
        src={spaceData?.screenshot_url || headerImage}
        width={2000}
        height={300}
        alt={"header"}
        style={{ objectFit: "cover", width: "100%" }}
      />
      <Grid
        container
        spacing={3}
        sx={(theme) => ({
          paddingRight: "1rem",
          paddingLeft: "1rem",
          [theme.breakpoints.up("md")]: {
            paddingRight: "15%",
            paddingLeft: "15%",
          },
          minHeight: "50vh",
          mt: 2,
        })}
      >
        <Grid xs={12} lg={8}>
          <Box
            sx={{
              border: "1px solid #e9e9e9",
              borderRadius: "10px",
              padding: "1rem 2rem",
              position: "relative",
            }}
          >
            <Image
              src={spaceData?.screenshot_url || nikeImage}
              width={150}
              height={150}
              alt={"header"}
              style={{
                width: "8rem",
                height: "8rem",
                objectFit: "cover",
                position: "absolute",
                top: -75,
                left: 25,
                borderRadius: "100px",
                border: "4px solid white",
              }}
            />
            <Stack
              flexDirection={"row"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold" }}
                mt={6}
                mb={2}
              >
                {spaceData?.name}
              </Typography>
              <a
                href={`${
                  process.env.NEXT_PUBLIC_ENV === "prod"
                    ? "https://app.tryspace.com"
                    : "https://metaverse-demo.com"
                }/${hubId}`}
                target="_blank"
              >
                <Button
                  variant="contained"
                  endIcon={<RocketLaunchOutlinedIcon />}
                  size="large"
                >
                  Enter Space
                </Button>
              </a>
            </Stack>
            <Typography variant="subtitle1">Official Store</Typography>
            <Typography variant="body1" mt={3}>
              {spaceData?.description || "No description"}
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #e9e9e9",
              borderRadius: "10px",
              padding: "1rem 2rem",
              position: "relative",
              mt: 3,
            }}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">Featured Products</Typography>
              <ShoppingBasketOutlinedIcon />
            </Stack>
            <Divider sx={{ pt: 2 }} />
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {spaceData?.products?.map((product) =>
                product?.product_variation?.map((variation: any) => (
                  <Grid xs={12} md={6} key={variation.title}>
                    <ProductCard
                      hubId={product.hub_sid}
                      quantity={variation.quantity}
                      productId={variation.product_variation_sid}
                      title={product.name}
                      owner={product.created_by}
                      image={variation.thumbnail_url}
                      price={variation.price}
                      startDate={product.start_date}
                      endDate={product.end_date}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} lg={4}>
          <Box
            sx={{
              border: "1px solid #e9e9e9",
              borderRadius: "10px",
              padding: "1rem 2rem",
              position: "relative",
            }}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">Events</Typography>
              <CalendarMonthOutlinedIcon />
            </Stack>
            <Divider sx={{ pt: 2 }} />
            {eventsData?.data?.map((event: any, index: number) => (
              <Box pt={2} key={`${event.name}-${index}}`}>
                <EventCard
                  id={event.event_sid}
                  hubId={event.hub_id}
                  startDate={event.start_date}
                  endDate={event.end_date}
                  title={event.name}
                  image={event.image_url}
                  timeslots={event.timeslots}
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              border: "1px solid #e9e9e9",
              borderRadius: "10px",
              padding: "1rem 2rem",
              position: "relative",
              mt: 3,
            }}
          >
            <Typography variant="h5">Communication</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Spaces;
