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


module.exports  = router