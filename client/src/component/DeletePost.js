import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "./PostList";

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      body
      post_id
      create_at
      creater
      creater_name
    }
  }
`;

export default function DeletePost({ post_id }) {
  const [showModal, setShowModal] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      id: post_id,
    },
    update(cache, { data }) {
      const existeData = cache.readQuery({ query: GET_POSTS });
      // console.log(existeData);
      const newData = existeData.posts.filter(
        (post) => post.post_id !== post_id
      );
      // console.log(newData);
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: newData },
      });
    },
  });

  return (
    <>
      <Button
        variant="danger"
        className="mx-5"
        onClick={() => setShowModal(!showModal)}
      >
        Delete
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Are you sure to delete this post?!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
