import React, { Component } from 'react';
// helps write graphQL queries in js file
import gql from 'graphql-tag';
// similare to connect in redux
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';



class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: { title: this.state.title },
      // re run theses after mutation!
      // prevents re-render issue list in store...
      // otherwise new shit would not show up in list 
      // upon second rendering...
      // second param below would be where vars go if
      // query required those
      //(this method works.... or you can config apollo to know about ids!)
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <h3>Create a new Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

// think of as a function with args...
const mutation = gql`
mutation AddSong($title: String){
  addSong(title: $title) {
    title
    id
  }
}
`;

export default graphql(mutation)(SongCreate);
