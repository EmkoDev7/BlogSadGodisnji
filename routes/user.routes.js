const express = require("express");
const router = express.Router();
const {renderAddBlogs,
    addBlogs,
    renderBlogs,
    renderSingleBlog,
    addComments} = require('../controllers/user.controller')

router.get('/add-blog', renderAddBlogs);

router.post('/blogs', addBlogs );

router.get('/blogs', renderBlogs );

router.get('/blogs/:id', renderSingleBlog);

router.post('/blogs/:id/comments', addComments );

module.exports = router;
