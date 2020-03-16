import React from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

//can make query like graphQL
const PERSONS = gql`
query {
  persons {
    name
    gender
  }
}
`;

const PersonList = () => {
  return (
    <div>
      <h1>Person List</h1>
      <Query query={PERSONS}>
      {
        ({ loading, data, error }) => {
            // loading : return true after request
            // return false complete request
            if(loading) { 
              return <span>Loading...</span>;
            } else if(error) { 
              return <span>{error}</span>;
            }

            return data.persons.map((person, idx)=>{
              return (
                <p key={idx}>
                  Name : {person.name},
                  Gender : {person.gender}
                </p>
              );
            });
        }
      }
      </Query>
    </div>
  );
}

export default PersonList;