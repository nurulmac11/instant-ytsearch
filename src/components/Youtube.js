import React, { Component } from 'react';
import search from 'youtube-search';
import TimeAgo from 'react-timeago'

const Iframe = (props) => {
    if(props.url)
        return (
        <div>
            <iframe width="560" height="315" src={props.url + '?autoplay=true'}
                    title="youtube-video" frameBorder="0" allow="encrypted-media"
                    allowFullScreen></iframe>
            <br/>
        <button type="button" className="btn btn-warning" onClick={()=>props.closeit('')} >Close</button>
        </div>
            )
    else
        return null;
};

const YoutubeCard = (pro) => {
    return <div className="card" onClick={(e) => pro.handleShow(e,pro.link)} >
      <img className="card-img-top" src={pro.thumbnails.high.url} alt="Card cap"/>
      <div className="card-body">
        <h5 className="card-title">{pro.title}</h5>
        <p className="card-text">
          {pro.description}
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">
      <TimeAgo date={pro.publishedAt} /> by <i>{pro.channelTitle}</i>
        </small>
      </div>
    </div>
}


class Youtube extends Component {

    constructor(props) {
        super(props);
        this.state = { search: [], value: '', count: 10, showroom:''};
        this.searcher();
    }

    handleChange(e, field) {
        var nextState = {}
        nextState[field] = e.target.value;
        this.setState(nextState);
        if(field==='value')
            this.handleSubmit(null)
    }

    handleShow(e, url) {
        var nextState = {}
        nextState['showroom'] = url;
        if(this.state.showroom === url)
            this.setState({
                showroom: ''
            });
        else{
            this.setState(nextState);
            window.scrollTo(0, 0);
        }
    }

    handleSubmit(event) {
        if(event)
            event.preventDefault();
        this.searcher();
    }

    searcher() {
        var opts = {
          maxResults: this.state.count,
          key: 'YOUR-YT-APIV3-KEY-IS-HERE',
          videoEmbeddable: 'true',
          type: 'video',
          videoSyndicated: 'true',
          'safeSearch': 'moderate',
        };
        search(this.state.value, opts, (err, results) => {
            this.setState({
                search: this.chunkThis(results)
            })
        });
    }

    chunkThis(array) {
        var i,j,temparray,chunk = 5;
        var chunks= [];
        for (i=0,j=array.length; i<j; i+=chunk) {
            temparray = array.slice(i,i+chunk);
            chunks.push(temparray)
        }
        return chunks;
    }

    render() {
        return (
            <div className="youtube-results">
                <Iframe url={this.state.showroom.replace("watch?v=", "embed/")} closeit={(showroom) =>this.setState({showroom})} />
                <form>
                <div className="row margin-clean">
                <div className="col">
                    <input type="text" onChange={(e) => this.handleChange(e,'value')} 
                        placeholder="Search..." value={this.state.value} className="form-control"/>
                    </div>
                </div>
                    </form><br/>

                {this.state.search.map((pros,i) => 
                    <div className="card-deck margin-clean" key={i}>
                    {pros.map((pro)=>
                        <YoutubeCard key={pro.id} {...pro} handleShow={(e,link) => this.handleShow(e,link)} />
                      )}
                    </div>
                      )}
            </div>
        );
    }
}

export default Youtube;
