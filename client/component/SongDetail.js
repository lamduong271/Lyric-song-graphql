import React , {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchSongs';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
class SongDetail extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const {song} = this.props.data;
        if(!song){
            return (<div>Loading</div>)
        }
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}></LyricList>
                <LyricCreate songId={this.props.params.id}></LyricCreate>
            </div>
        )
    }
}

export default graphql(fetchSong,{
    options:(props)=>{ 
        return { variables:{id: props.params.id}}
    }
})(SongDetail);