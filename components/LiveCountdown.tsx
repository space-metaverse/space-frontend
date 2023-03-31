import { Typography } from "@mui/material";

interface CountdownRenderProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
  isLive: boolean;
}

const CountdownRender = ({ hours, minutes, seconds, completed, isLive }: CountdownRenderProps) => {
  if (isLive) {
    return <Typography variant="h4" display="inline" pr={2}>
      Live now!
    </Typography>
  } else if (completed && !isLive) {
    return <Typography variant="h4" display="inline" pr={2}>
      Ended
    </Typography>
  } else {
    return <>
      <Typography variant="h5" color="text.secondary" display="inline" pr={2}>
        Live In:
      </Typography>
      <Typography variant="h4" display="inline" pr={2}>
        {hours}h {minutes}m {seconds}s
      </Typography>
    </>;
  }
};

export default CountdownRender;