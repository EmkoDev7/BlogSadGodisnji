const express = require("express");
const router = express.Router();
const ejs = require('ejs');
const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'blogs.json');


let blogs = [];
const blogsData = fs.readFileSync(p);
blogs = JSON.parse(blogsData);




exports.renderAddBlogs = (req, res) => {
    res.render('add-blog', { blogs });
}

exports.addBlogs = (req, res) => {
    const { title, username, content } = req.body;

    const blog = {
        id: v4(),
        title,
        username,
        content,
        comments: []
    };

    blogs.push(blog);


    fs.writeFileSync(p, JSON.stringify(blogs, null, 2));

    res.redirect('/blogs');
}

exports.renderBlogs = (req, res) => {
    res.render('blogs', { blogs });
}

exports.renderSingleBlog = (req, res) => {
    const blogId = req.params.id;
    const blog = blogs.find(blog => blog.id === blogId);

    if (blog) {
        res.render('blog-detail', { blog });
    } else {
        res.status(404).send('Blog nije pronađen');
    }
}

exports.addComments = (req, res) => {
    const blogId = req.params.id;
    const blog = blogs.find(blog => blog.id === blogId);

    if (blog) {
        const { comment } = req.body;
        blog.comments.push({ comment });

        
        fs.writeFileSync(p, JSON.stringify(blogs, null, 2));

        res.redirect(`/blogs/${blogId}`);
    } else {
        res.status(404).send('Blog nije pronađen');
    }
}