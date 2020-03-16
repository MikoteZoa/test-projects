import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './ApolloClinet';
import PersonList from './PersonList';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PersonList />
      </ApolloProvider>
    );
  }
}

export default App;