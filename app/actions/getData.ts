"use server";
export default async function getAllData() {
  try {
    const response = await fetch(`${process.env.MONGODB_URL_FETCH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": process.env.MONGODB_DATA_API_KEY!,
      },
      body: JSON.stringify({
        collection: "todos",
        database: "todos",
        dataSource: "Cluster0",
        filter: {},
        sort: { _id: -1 }, // Sort by most recent first
      }),
    });

    const responseText = await response.text();

    // Try to parse the response to handle malformed JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      return new Response(
        JSON.stringify({
          error: "Failed to parse response",
          rawResponse: responseText,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the result has documents
    if (!result || !result.documents) {
      return new Response(
        JSON.stringify({
          error: "No documents found",
          fullResponse: result,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(result.documents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch transactions",
        details: error instanceof Error ? error.message : error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
