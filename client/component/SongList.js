import React , {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
import {Link} from 'react-router';
import SongCreate from './SongCreate';
import query from '../queries/fetchSongs';
class SongList extends Component{
    constructor(props){
        super(props);
    }
    renderSong(){
        if(this.props.data.loading) {
            return <div>Loading...</div>
            
        }
        else {
        return this.props.data.songs.map(song => {
            return (
                <li 
                className="collection-item"
                key={song.id}>
                <Link to={`/songs/${song.id}`}>{song.title}</Link>
                <span className="right">
                <i className="material-icons" 
                onClick={()=> this.deleteSong(song.id)}>delete</i>
                </span>
                </li>
            )
        })
        }
    }

    deleteSong (id) {
        this.props.mutate({
            variables:{
                id
            }
        }).then(()=>this.props.data.refetch())
    }
    render(){
        console.log(this.props)
        return(
            <div>
            <ul className="collection">{this.renderSong()}</ul>
            <Link 
            className="btn-floating btn-large red right"
            to="songs/new">
            <i className="material-icons">add</i>
            </Link>
            </div>
        )
    }
}

const mutation = gql`
mutation DeleteSong($id:ID){
    deleteSong(id:$id){
        id
    }
}`;
export default graphql(mutation)(
    graphql(query)(SongList)
)
