const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  body: String,
  username: String,
  // could add a default here, but prefer to do it on the GQL resolvers
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  // MongoDB is "schemaless"/NOsql, doesn't have relations, but the ORM itself lets us have relations between our models
  // this lets us automatically populate these fields later if we want using Mongoose methods
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Post', postSchema);
