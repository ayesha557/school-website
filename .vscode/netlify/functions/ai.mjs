
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Gemini API key is missing.");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key is not configured." })
      };
    }

    if (!message || typeof message !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please enter a question." })
      };
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
      console.error("Gemini API error:", response.status, data);

      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "Gemini API request failed."
        })
      };
    }

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reply: answer })
    };

  } catch (error) {
    console.error("AI function error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Something went wrong. Please try again."
      })
    };
  }
};
