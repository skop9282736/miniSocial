const express = require('express')
const passport = require('passport')
const wrap = require('express-exception-handler').wrap
const postsController = require('./../../controller/posts.controller')

const router = express.Router()

/*
    @route POST api/posts
    @desc create post
    @access private
*/
router.post('/', passport.authenticate('jwt',  { session: false }), wrap(
    postsController.createPost
))

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  postsController.deletePost
);


// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', postsController.getPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', postsController.getPostById);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  postsController.likePost
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  postsController.unlikePost
);


// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  postsController.addComment
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  postsController.deleteComment
);



module.exports  = router