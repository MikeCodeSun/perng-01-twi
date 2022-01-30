import React, { useState } from "react";
import { useGlobleContext } from "../context/context";
import { gql, useQuery } from "@apollo/client";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostEdit from "../component/PostEdit";
import DeletePost from "../component/DeletePost";

const SEARCH_POST = gql`
  query SearchPost($body: String!) {
    searchPost(body: $body) {
      post_id
      body
      create_at
      creater
      creater_name
    }
  }
`;

export default function SearchPage() {
  const [errorMsg, setErrorMsg] = useState({});
  const { searchInput, user } = useGlobleContext();
  // console.log(searchInput);
  const { data, loading, error } = useQuery(SEARCH_POST, {
    variables: {
      body: searchInput,
    },
    onError(error) {
      // console.log(error);
      setErrorMsg(error.graphQLErrors[0].extensions.errorMsg);
    },
  });

  if (!searchInput) {
    return <Alert variant="warning text-center">No Result</Alert>;
  }

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
      <>
        {Object.values(errorMsg).map((err, index) => {
          return (
            <Alert variant="warning text-center" key={index}>
              {err}
            </Alert>
          );
        })}
      </>
    );
  }
  console.log(data);

  return (
    <>
      {data &&
        data.searchPost.map((post) => {
          const { post_id, body, creater, create_at, creater_name } = post;
          const date = new Date(Number(create_at))
            .toString()
            .split(" ")
            .slice(0, 4);

          // console.log(date);
          return (
            <Card
              key={post_id}
              className="text-capitalize w-75 mx-auto my-3 shadow"
              style={{ maxWidth: "900px" }}
            >
              <Card.Header>{creater_name}</Card.Header>
              <Card.Body>
                <Card.Title>{body}</Card.Title>
                <Card.Text className="text-secondary">
                  Posted @{" "}
                  {date.map((item, index) => (
                    <span key={index}>{item} </span>
                  ))}
                </Card.Text>

                <Link to={`/${post_id}`}>
                  <Button variant="primary" className="mx-5">
                    Details
                  </Button>
                </Link>
                {/* {user && user.id === Number(creater) && (
                  <PostEdit post={post} />
                )}
                {user && user.id === Number(creater) && (
                  <DeletePost post_id={post_id} />
                )} */}
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
}
