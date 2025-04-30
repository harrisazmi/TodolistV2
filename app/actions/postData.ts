"use server";

import { revalidatePath } from "next/cache";

export default async function postData(data: string) {
  const response = await fetch(`${process.env.MONGODB_URL_POST}`, {
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
      document: { info: data },
    }),
  });
  revalidatePath("/");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to insert data");
  }

  return response.json();
}
