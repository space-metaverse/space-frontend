"use client"
import { Card } from "@space-metaverse-ag/space-ui"
import Link from "next/link"
import styled from "styled-components"
import { useGetMySpacesQuery } from "../../api/space"

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export default function Spaces() {
  const { data, error, isLoading } = useGetMySpacesQuery({})

  return (
    <div>
      <h1>My Spaces</h1>
      <Grid>
        {data?.entries?.map((space) => (
          <Link href={`/spaces/${space.id}`} key={space.id}>
            <Card image={space.images.preview.url} style={{ width: '20rem' }}>
              <p>{space.name}</p>
            </Card>
          </Link>
        ))}
      </Grid>
    </div>
  )
}