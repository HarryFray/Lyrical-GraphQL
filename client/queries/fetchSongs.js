import gql from 'graphql-tag';

// not exicuting query...simply writting it
export default gql`
{
  songs {
    title
    id
  }
} 
`;

