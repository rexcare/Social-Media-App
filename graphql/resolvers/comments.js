const { UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);
      // make sure the comment isn't empty
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      }
      // post doesn't exist
      throw new UserInputError('Post not found');
    },
  },
};
