import { useState } from "react";


import InShortModal from "./InShortModal";
import image from '../assets/default-news.jpg'

import { extractArticleContent, summarizeContent } from "../utils/extractContent";



const Newsitems = ({ title, description, src, url }) => {
    const [showModal, setShowModal] = useState(false);
    const [summary, setSummary] = useState("");

    const generateSummary = async () => {
        setShowModal(true);
        setSummary("Loading...");

        try {
            const fullContent = await extractArticleContent(url);
            if (!fullContent || fullContent === "Failed to extract content.") {
                setSummary("Failed to extract content from the article.");
                return;
            }

            const summaryText = await summarizeContent(fullContent);
            setSummary(summaryText);
        } catch (error) {
            console.error("Summary generation failed:", error);
            setSummary("Failed to generate summary. Please try again later.");
        }
    };




    return (
        <>
            <div className="card bg-dark text-light mb-3 w-100 shadow">
                <img
                    src={src ? src : image}
                    onError={(e) => { e.target.src = image }}
                    style={{ height: "200px", objectFit: "cover" }}
                    className="card-img-top"
                    alt="News Image"
                />






                <div className="card-body">
                    <h5 className="card-title">
                        {title ? title.slice(0, 50) : "No Title Available"}
                    </h5>
                    <p className="card-text">
                        {description
                            ? description.slice(0, 90)
                            : "This is the latest news. It is information about something that has just happened."}
                    </p>
                    <div className="d-flex justify-content-between">
                        <a href={url} className="btn btn-primary">
                            Read More
                        </a>
                        <button className="btn btn-warning" onClick={generateSummary}>
                            In Short
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <InShortModal
                    summary={summary}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default Newsitems;

