import ApolloClinet from 'apollo-boost';

const client = new ApolloClinet({
    uri: "http://localhost:4000/graphql"
});

export default client;