import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general",
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("This is a news constructor");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.capitalize(this.props.category)} - Daily News`
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a56c428e0c241daaa5a6f289ca81dea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    // handelPreviousClick = async() => {
    //     console.log("previous click");
    //     this.setState({page: this.state.page-1});
    //     this.updateNews();
    // }

    // handleNextClick = async() => {
    //     console.log("next click");
    //     this.setState({page: this.state.page+1});
    //     this.updateNews();
    // }

    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a56c428e0c241daaa5a6f289ca81dea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    }

    render() {
        return (
            <>
                <h1 className='text-center my-3'>Daily News - Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.totalResults !== this.state.articles.length}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {!this.state.loading && this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div>
                    <div className="container d-flex justify-content-between">
                        <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handelPreviousClick}>&larr; Previous</button>
                        <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div> */}
            </>
        )
    }
}

// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
// }

// News.defaultProps = {
//     country: "in",
//     pageSize: 9
// }

export default News
