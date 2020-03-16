var express = require('express');
const graphqlHTTP = require('express-graphql');
var GraphQL = require('graphql');
var cors = require('cors');
var dummyDatabase = require('./DummyData');

const personType = new GraphQL.GraphQLObjectType({
    name: "Person",
    fields: {
        id: { type: GraphQL.GraphQLInt },
        name: { type: GraphQL.GraphQLString },
        gender: { type: GraphQL.GraphQLString },
    }
});

let queryType = new GraphQL.GraphQLObjectType({
    name: "Query",
    fields: {
        person: {
            type: personType,
            args: {
                id: { type: GraphQL.GraphQLInt }
            },
            resolve: function(obj, args, context, info) {
                //Request Type 1 : id를 argument로 받아 조건 매칭
                const data = Object.keys(dummyDatabase).filter(element =>{
                    if(dummyDatabase[element].id == args.id){
                        return element;
                    }
                });
                return dummyDatabase[data];
            }
        },
        persons: {
            //Request Type 2 : Every information of persons
            type: new GraphQL.GraphQLList(personType),
            resolve: function(obj, args, context, info) {
                return dummyDatabase;
            }
        }
    }
});

var schema = new GraphQL.GraphQLSchema({ query: queryType });

var app = express();

app.use(cors());
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);

app.listen(4000);

console.log("Running a GraphQL server.");