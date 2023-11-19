'use server'
import { Auction, PagedResult } from "@/types";

export const getData = async (query: string): Promise<PagedResult<Auction[]>> => {
  const response = await fetch(`http://localhost:6001/search${query}`);
  if (!response.ok) throw new Error("Error fetching auctions");

  return response.json();
}
