import React from "react";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { useGlobleContext } from "../context/context";
import DeletePost from "./DeletePost";
import { Link } from "react-router-dom";
import PostEdit from "./PostEdit";

export const GET_POSTS = gql`
  query Posts {
    posts {
      post_id
      body
      create_at
      creater
      creater_name
    }
  }
`;

export default function PostList() {
  const { user } = useGlobleContext();
  const { data, loading, error } = useQuery(GET_POSTS);

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
  // console.log(data, error, loading);
  return (
    <>
      {data &&
        data.posts.map((post) => {
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
                {user && user.id === Number(creater) && (
                  <PostEdit post={post} />
                )}
                {user && user.id === Number(creater) && (
                  <DeletePost post_id={post_id} />
                )}
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
}
