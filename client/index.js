import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import App from './components/App';
import SongDetail from './components/SongDetail';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';



// this file is minimum config for react with apollo
const client = new ApolloClient({
  //takes every piece of data comming from qpollo client
  // and runs it through this function
  // use id of reccord in apollo store...Apollo does not
  // want to auto assume this.
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>

        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>

      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
