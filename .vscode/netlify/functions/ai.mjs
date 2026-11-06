
export default async (request) => {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405 }
    );
  }

  try {
    const { message } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: "You are the helpful AI assistant for Government Girls Secondary School, Block V, Shah Faisal Colony, Karachi. Answer questions about the school, admissions, classes, activities and education politely. If you do not know an answer, ask the visitor to contact the school office. Do not invent school information."
            }]
          },
          contents: [{
            parts: [{ text: message }]
          }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Gemini API request failed." }),
        { status: response.status }
      );
    }

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

    return Response.json({ reply: answer });

  } catch (error) {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
