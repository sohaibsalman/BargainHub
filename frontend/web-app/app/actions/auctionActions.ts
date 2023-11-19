'use server'
import { Auction, PagedResult } from "@/types";

export const getData = async (pageNumber: number = 1, pageSize: number = 4): Promise<PagedResult<Auction[]>> => {
  const response = await fetch(`http://localhost:6001/search?pageSize=${pageSize}&pageNumber=${pageNumber}`);
  if (!response.ok) throw new Error("Error fetching auctions");

  return response.json();
}
