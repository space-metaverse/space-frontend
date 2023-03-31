import { Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import spaceImage from "../public/space-store.png"

interface SpaceCardProps {
  hubId: string
  title: string
  owner: string
  image: string
}

const SpaceCard = ({ hubId, title, owner, image }: SpaceCardProps) => {
  const router = useRouter()

  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        sx={{ height: 140 }}
        title={title}
      >
        <Image src={image || spaceImage} alt={title} height={140} width={300} style={{ width: '100%', objectFit: 'cover' }} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {owner}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/spaces/${hubId}`)}>Visit Space</Button>
      </CardActions>
    </Card>
  )
}

export default SpaceCard
