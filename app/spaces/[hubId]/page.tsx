"use client"
import { usePathname } from "next/navigation"
import { useGetSpaceQuery } from "../../../api/space"

export default function Spaces() {
  const pathname = usePathname();
  const hubId = pathname?.split("/")[2];

  const { data, error, isLoading } = useGetSpaceQuery({ hubId: String(hubId) }, { skip: !hubId })

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>Space URL: <b><a href={data?.url}>{data?.url}</a></b></p>
      <br />
      <p>Email: <b>{data?.business_details?.business_email}</b></p>
      <br />
      <p>Wallet: <b>{data?.business_details?.wallet}</b></p>
      <br />
      <p>Contact Name: <b>{data?.business_details?.contact_first_name} {data?.business_details?.contact_last_name}</b></p>
    </div>
  )
}