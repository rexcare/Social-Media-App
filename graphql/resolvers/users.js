const User = require('../../models/user');

module.exports = {
  Mutation: {
    register(_, args, ctx, info) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: Hash the password
      // TODO: Create auth token
    },
  },
};
