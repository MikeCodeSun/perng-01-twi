import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Alert, Button, Card, Spinner } from "react-bootstrap";

const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      post_id
      body
      create_at
      creater
      creater_name
    }
  }
`;

export default function SinglePost() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });

  if (loading) {
    return (
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto mt-3"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (error) {
    return (
      <Alert variant="warning text-center">Error, Something went wrong.</Alert>
    );
  }
  console.log(data);
  return (
    <>
      {data && (
        <Card
          bg="info"
          text="light"
          style={{ width: "18rem" }}
          className="mt-5 w-50 mx-auto shadow"
        >
          <Card.Header>{data.post.creater_name}</Card.Header>
          <Card.Body>
            <Card.Title> {data.post.body} </Card.Title>
            <Card.Text>
              <Link to="/">
                <Button variant="outline-secondary">Go Back Home Page</Button>
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
