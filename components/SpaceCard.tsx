import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  CardActionArea,
  Chip,
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
  categories?: { slug: string }[];
}

const SpaceCard = ({
  hubId,
  title,
  owner,
  image,
  description,
  categories,
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
            <Stack mt={2} flexDirection="row" gap={1}>
              {categories?.map((category) => (
                <Chip
                  key={category.slug}
                  label={category.slug}
                  sx={{ color: "text.secondary" }}
                />
              ))}
            </Stack>
            <Typography variant="body1" color="text.secondary" mt={2}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <a
              href={`${
                process.env.NEXT_PUBLIC_ENV === "prod"
                  ? "https://app.tryspace.com"
                  : "https://metaverse-demo.com"
              }/${hubId}`}
              target="_blank"
            >
              <Button size="large" fullWidth variant="contained">
                Jump In
              </Button>
            </a>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default SpaceCard;
