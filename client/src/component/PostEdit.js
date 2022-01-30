import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "./PostList";

const EDIT_POST = gql`
  mutation UpdatePost($id: ID!, $body: String!) {
    updatePost(id: $id, body: $body) {
      post_id
      body
      create_at
      creater
      creater_name
    }
  }
`;

export default function PostEdit({ post }) {
  const [error, setError] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState(post.body);
  const [alert, setAlert] = useState(false);
  const [editPost] = useMutation(EDIT_POST, {
    variables: {
      id: post.post_id,
      body,
    },
    update(cache) {
      const exitedData = cache.readQuery({ query: GET_POSTS });
      // console.log(exitedData);
      const newData = exitedData.posts.map((item) => {
        if (item.post_id === post.post_id) {
          return { ...item, body };
        }
        return item;
      });
      // console.log(newData);
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: newData },
      });
      setShowModal(false);
      setAlert(false);
    },
    onError(error) {
      setError(error.graphQLErrors[0].extensions.errorMsg);
      setAlert(true);
    },
  });

  useEffect(() => {
    // console.log("alert");
    const timeOut = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [error]);

  // console.log(post);
  // console.log(error);
  // console.log(alert);
  return (
    <>
      <Button
        variant="warning"
        className="mx-5"
        onClick={() => setShowModal(true)}
      >
        Edit
      </Button>
      {/* modal */}
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton onClick={() => setBody(post.body)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicPost">
            <Form.Control
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
          {alert > 0 &&
            Object.values(error).map((err, index) => {
              return (
                <Alert key={index} variant="danger" className="m-0">
                  {err}—check it out!
                </Alert>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              editPost();
            }}
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setBody(post.body);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
