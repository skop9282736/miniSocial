const Post = require('./../models/Post')
const validatePostInput = require('./../validation/post')

module.exports.createPost = async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const post = await Post.create({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });

    return res.status(200).json(post)
}

module.exports.deletePost = async (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'User not authorized' });
        }
        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
}

module.exports.getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
}

module.exports.getPostById = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: 'No post found with that ID' })
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
}