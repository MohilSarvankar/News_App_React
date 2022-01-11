import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageurl,newsurl,author,date,source} = this.props;
        return (
            <div className='my-3'>
                <div className="card m-2">
                    <div style={{display:"flex",position:"absolute",right:"0"}}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={imageurl?imageurl:"https://i.ytimg.com/vi/tlGTem8vkB0/maxresdefault_live.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
