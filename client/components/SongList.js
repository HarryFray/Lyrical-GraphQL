import React, { Component } from 'react';
// helps write queries in js file
import gql from 'graphql-tag';
// bonding ql server to react..its the glue
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {

  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
      // two ways to have query done again...
      // see SongCreate
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    // must throw in this case graph ql causees 
    // component to be render 2 times
    // first time no data available....
    if (this.props.data.loading) return <div></div>
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large green right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
mutation DeleteSong($id: ID){
  deleteSong(id: $id) {
    id
  }
}
`;

// similar to redux
// returns function imediatly invocating with second ()s
// throws that shit on props!
// this actually runs the query!
export default graphql(mutation)(
  graphql(query)(SongList)
);