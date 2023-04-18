import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  CardActionArea,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import spaceImage from "../public/space-store.png";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

interface SpaceCardProps {
  hubId: string;
  title: string;
  owner: string;
  image: string;
  description?: string;
}

const SpaceCard = ({
  hubId,
  title,
  owner,
  image,
  description,
}: SpaceCardProps) => {
  const router = useRouter();

  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <Stack height="100%" justifyContent="space-between">
        <CardActionArea onClick={() => router.push(`/spaces/${hubId}`)}>
          <CardMedia sx={{ height: 250 }} title={title}>
            <Image
              src={image || spaceImage}
              alt={title}
              height={250}
              width={300}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By: {owner}
            </Typography>
            {}
            <Typography variant="body1" color="text.secondary" mt={2}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Button
              size="large"
              onClick={() => router.push(`/spaces/${hubId}`)}
              fullWidth
              variant="contained"
            >
              Jump In
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default SpaceCard;
