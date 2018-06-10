import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongDetails';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyric: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.lyric,
        songid: this.props.songid
      },
      refetchQueries: [{ query }]
    }).then(() => this.setState({ lyric: '' }))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <lable>Add a Lyric</lable>
        <input
          onChange={e => this.setState({ lyric: e.target.value })}
          value={this.state.lyric}
        />
      </form>
    )
  }
}

const mutation = gql`
 mutation AddLyric($content: String, $songid: ID!){
  addLyricToSong(content: $content, songId: $songid) {
    id
    lyrics{
      id
      content
    }
  }
}`;

export default graphql(mutation)(LyricCreate);