"use server";

import { revalidatePath } from "next/cache";

export default async function deleteData(data: string) {
  const response = await fetch(`${process.env.MONGODB_URL_DELETE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": `${process.env.MONGODB_DATA_API_KEY}`,
    },
    body: JSON.stringify({
      collection: "todos",
      database: "todos",
      dataSource: "Cluster0",
      filter: { _id: { $oid: data } },
    }),
  });
  revalidatePath("/");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete data");
  }

  return response.json();
}
