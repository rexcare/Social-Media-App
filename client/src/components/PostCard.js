/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

// eslint-disable-next-line react/prop-types
function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);

  function likePost() {
    console.log('like post');
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" floated="right" onClick={() => console.log('delete post')}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
