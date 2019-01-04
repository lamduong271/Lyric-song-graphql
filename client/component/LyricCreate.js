import React , {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchSongs';

class LyricCreate extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }
    onSubmitLyric(evenr){
        event.preventDefault();
        this.props.mutate({
            variables:{
                content:this.state.content,
                songId:this.props.songId
            }
        }).then(()=>{
            this.setState({
                content:''
            })
        })
    }
    render() {
        return(
            <form onSubmit={this.onSubmitLyric.bind(this)}>
                <label>Add a Lyric</label>
                <input 
                    onChange={(e)=>this.setState({content:e.target.value})}
                    value={this.state.content}                
                    type="text"/>
            </form>
        )
    }
}

const mutation = gql`
mutation AddLyricToSong($content:String,$songId:ID){
    addLyricToSong(content:$content,songId:$songId){
      id
      lyrics{
        id
        content
        likes
      }
    }
}`;

export default graphql(mutation)(LyricCreate);