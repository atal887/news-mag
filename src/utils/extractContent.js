// src/utils/extractContent.js

export const extractArticleContent = async (url) => {
  try {
    const response = await fetch(`http://localhost:5000/extract?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.content;
  } catch (err) {
    console.error("Error extracting article content:", err);
    return "Failed to extract content.";
  }
};

export const summarizeContent = async (content) => {
  try {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();
    return data.summary || "Summary not available.";
  } catch (err) {
    console.error("Error summarizing content:", err);
    return "Failed to generate summary.";
  }
};
