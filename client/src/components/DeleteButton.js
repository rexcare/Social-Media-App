/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import Tooltip from '../util/Tooltip';

import { FETCH_POSTS_QUERY } from '../util/graphql';

// eslint-disable-next-line react/prop-types
function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy, result) {
      setConfirmOpen(false);

      if (!commentId) {
        // removing the post from the client-side cache
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        // render all the posts minus the one we just deleted
        const posts = [result.data, ...data.getPosts];
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
      }

      // if it is passed, call the callback (i.e. defined in SinglePost to redirect the user to the homepage)
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
    onError(err) {
      return err;
    },
  });
  return (
    <>
      <Tooltip content={commentId ? 'Delete this comment' : 'Delete this post'}>
        <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </Tooltip>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrComment} />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
