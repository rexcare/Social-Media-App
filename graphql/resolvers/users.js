const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/user');

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      ctx,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: Hash the password
      password = await bcrypt.hash(password, 12);

      // create the new user with the model and passed in data
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      // save the user to the DB
      const res = await newUser.save();
      // TODO: Create auth token
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
