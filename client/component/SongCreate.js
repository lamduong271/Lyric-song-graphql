import React , {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component{
    constructor(props){
        super(props);
        this.state = { title : ''}
    }
    onSubmitForm(event){
        event.preventDefault();
        this.props.mutate({
            variables:{
                title: this.state.title
            },
            refetchQueries: [{
                query: query
            }]
        }).then(()=> hashHistory.push('/'))
    }
    render(){
        console.log(this.props)
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmitForm.bind(this)}>
                    <label>Song title:</label>
                    <input 
                    value={this.state.title}
                    onChange={e=>this.setState({title:e.target.value})}
                    />
                </form>
            </div>
        )
    }
}
const mutation = gql`
mutation AddSong($title:String){
    addSong(title:$title){
      title
      id
    }
  }
`;
// const query = gql`
// {
//     songs{
//         title
//         id
//     }
// }
// `;
export default graphql(mutation)(SongCreate);