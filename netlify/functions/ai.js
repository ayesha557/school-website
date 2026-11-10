
exports.handler = async function (event) {
    const sendResponse = (statusCode, data) => ({
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (event.httpMethod !== "POST") {
        return sendResponse(405, { error: "Method not allowed." });
    }

    try {
        const { message } = JSON.parse(event.body || "{}");
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("Gemini API key is missing.");
            return sendResponse(500, {
                error: "AI assistant is not configured."
            });
        }

        if (!message || typeof message !== "string") {
            return sendResponse(400, {
                error: "Please enter your question."
            });
        }

        const url =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

        // Try up to two times.
        for (let attempt = 1; attempt <= 2; attempt++) {

            let response;

            try {
                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": apiKey
                    },
                    signal: AbortSignal.timeout(10000),
                    body: JSON.stringify({
                        systemInstruction: {
                            parts: [{
                                text: "You are the helpful AI assistant for Government Girls Secondary School, Block V, Shah Faisal Colony, Karachi. Answer questions about school admissions, classes, activities and education politely. Never invent school information. If you do not know an answer, ask visitors to contact the school office."
                            }]
                        },
                        contents: [{
                            parts: [{ text: message }]
                        }],
                        generationConfig: {
                            thinkingConfig: {
                                thinkingLevel: "low"
                            },
                            maxOutputTokens: 400
                        }
                    })
                });

            } catch (error) {
                console.error("Gemini connection error:", error.message);

                if (attempt === 1) {
                    await new Promise(resolve =>
                        setTimeout(resolve, 1000)
                    );
                    continue;
                }

                return sendResponse(504, {
                    error: "The AI service is taking too long. Please try again."
                });
            }

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                const answer =
                    data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (answer) {
                    return sendResponse(200, { reply: answer });
                }

                console.error("Gemini returned no answer:", data);

                return sendResponse(502, {
                    error: "Sorry, no answer was generated."
                });
            }

            console.error(
                "Gemini API error:",
                response.status,
                data
            );

            // Retry temporary server and rate-limit errors once.
            const retryable = [429, 500, 502, 503, 504];

            if (attempt === 1 && retryable.includes(response.status)) {
                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );
                continue;
            }

            return sendResponse(response.status, {
                error: response.status === 503
                    ? "Google AI is busy. Please try again shortly."
                    : "The AI assistant could not complete your request."
            });
        }

        return sendResponse(503, {
            error: "Google AI is temporarily unavailable. Please try again."
        });

    } catch (error) {
        console.error("AI function error:", error);

        return sendResponse(500, {
            error: "Something went wrong. Please try again."
        });
    }
};
