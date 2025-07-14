import { useEffect, useState } from "react";
import Newsitems from "./newsitem";

const Newsboard = ({ category, country }) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        let url = `https://gnews.io/api/v4/top-headlines?country=${country}&lang=en&topic=${category}&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;
        fetch(url).then(response => response.json()).then(data => setArticles(data.articles));

    }, [category, country])
    return (
        <div className="container my-4">


            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            {articles.length === 0 ? (
                <p className="text-center text-muted">No news available for this selection 📰</p>
            ) : (
                <div className="row">
                    {articles.map((news, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                            <Newsitems
                                title={news.title}
                                description={news.description}
                                src={news.image}
                                url={news.url}
                            />
                        </div>
                    ))}
                </div>
            )}


        </div>
    )
}
export default Newsboard;