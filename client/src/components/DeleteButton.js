/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';

// eslint-disable-next-line react/prop-types
function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy, result) {
      setConfirmOpen(false);

      // removing the post from the client-side cache
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      // render all the posts minus the one we just deleted
      const posts = [result.data, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });

      // if it is passed, call the callback (i.e. defined in SinglePost to redirect the user to the homepage)
      if (callback) callback();
    },
    variables: {
      postId,
    },
    onError(err) {
      return err;
    },
  });
  return (
    <>
      <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
