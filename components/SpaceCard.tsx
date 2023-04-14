import {
  Card,
  CardActions,
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
            {
              
            }
            <Typography variant="body1" color="text.secondary" mt={2}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ p: 3, pl: 4, pr: 4 }}>
          <Button
            size="large"
            onClick={() => router.push(`/spaces/${hubId}`)}
            fullWidth
            variant="contained"
          >
            Jump In
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default SpaceCard;
