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