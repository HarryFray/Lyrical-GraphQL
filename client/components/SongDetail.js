import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import query from '../queries/fetchSongDetails';



class SongDetail extends Component {

  render() {
    const { song } = this.props.data
    if (!song) return <div></div>
    return (
      <div>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songid={this.props.params.id} />
      </div>
    )
  }
}

// reuse this patter whenever a query requires a param
// mutations are manually called
// queries are auto called for us...therefore we 
//need this when ids are involved
export default graphql(query, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);