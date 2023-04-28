import { Box, Typography } from "@mui/material";

interface EventCalendarProps {
  month: string;
  day: number;
}

const EventCalendar = ({ month, day }: EventCalendarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "5rem",
        width: "6rem",
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "white",
          background: "#CF4236",
          textAlign: "center",
          borderRadius: "15px 15px 0 0",
          height: "100%",
          width: "100%",
          fontSize: "1rem",
        }}
      >
        {month}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          p: 1,
          color: "black",
          background: "#F0F0F5",
          textAlign: "center",
          borderRadius: "0 0 15px 15px",
          height: "100%",
          width: "100%",
        }}
      >
        {day}
      </Typography>
    </Box>
  );
};

export default EventCalendar;
