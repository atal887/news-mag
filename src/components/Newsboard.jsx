import { useEffect, useState } from "react";
import Newsitems from "./newsitem";

const Newsboard = ({ category }) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        fetch(url).then(response => response.json()).then(data => setArticles(data.articles));

    }, [category])
    return (
        <div className="container my-4">


            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            <div className="row">
                {articles.map((news, index) => (
                    <div
                        key={index}
                        className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
                    >
                        <Newsitems
                            title={news.title}
                            description={news.description}
                            src={news.urlToImage}
                            url={news.url}
                        />
                    </div>
                ))}
            </div>


        </div>
    )
}
export default Newsboard;