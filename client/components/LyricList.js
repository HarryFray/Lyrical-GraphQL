import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {

  onSongLike(id, likes) {
    this.props.mutate({
      variables: { id },
      // look at network response
      // put obj here exactly the same format
      optimisticResponse: {
        __typname: 'Mutation',
        likeLyric: {
          id,
          // add part that is optimistic
          likes: likes + 1,
          __typename: 'LyricType'
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onSongLike(id, likes)}>thumb_up</i>
            {likes}
          </div>
        </li>
      )
    })
  }

  render(props) {
    return (
      <div>
        <ul className="collection">
          {this.renderLyrics()}
        </ul>
      </div>
    )
  }
}

let mutation = gql`
mutation likeLyric($id: ID!){
  likeLyric(id: $id) {
      id
      likes
    }
  }
  `;

export default graphql(mutation)(LyricList);