import React, { useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { useGlobleContext } from "../context/context";
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "./PostList";

const CREATE_POST = gql`
  mutation CreatePost($input: postInput!) {
    createPost(input: $input) {
      post_id
      body
      create_at
      creater
      creater_name
    }
  }
`;

export default function PostInput() {
  const [body, setBody] = useState("");
  const [error, setError] = useState({});
  const { user } = useGlobleContext();
  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      input: {
        body,
      },
    },
    update(cache, { data }) {
      // console.log(data.createPost);
      const existData = cache.readQuery({ query: GET_POSTS });
      // console.log(existData);
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: [...existData.posts, data.createPost] },
      });
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.errorMsg);
    },
    onCompleted() {
      setBody("");
    },
  });
  return (
    <>
      {user && (
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Share something today"
          className="w-75 mt-5 shadow mx-auto"
          style={{ maxWidth: "900px" }}
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a post here"
            style={{ height: "100px" }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="d-grid">
            <Button
              variant="info"
              onClick={(e) => {
                e.preventDefault();
                createPost();
              }}
            >
              Send
            </Button>
          </div>
          {/* alert */}
          {Object.keys(error).length > 0 &&
            Object.values(error).map((err, index) => {
              return (
                <Alert key={index} variant="danger" className="m-0">
                  {err}—check it out!
                </Alert>
              );
            })}
        </FloatingLabel>
      )}
    </>
  );
}
