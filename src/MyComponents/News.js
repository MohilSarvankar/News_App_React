import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const updateNews = async() => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        document.title = `${capitalize(props.category)} - Daily News`
    }, [])

    // const handelPreviousClick = async() => {
    //     console.log("previous click");
    //     setPage(page-1);
    //     updateNews();
    // }

    // const handleNextClick = async() => {
    //     console.log("next click");
    //     setPage(page+1);
    //     updateNews();
    // }

    const fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
    }

        return (
            <>
                <h1 className='text-center' style={{marginTop:"80px",marginBottom:"25px"}}>Daily News - Top {capitalize(props.category)} Headlines</h1>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={totalResults !== articles.length}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {!loading && articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div>
                    <div className="container d-flex justify-content-between">
                        <button type="button" disabled={page <= 1} className="btn btn-primary" onClick={handelPreviousClick}>&larr; Previous</button>
                        <button type="button" disabled={page >= Math.ceil(totalResults/props.pageSize)} className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
                    </div>
                </div> */}
            </>
        )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
}

export default News
