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
module.exports  = router