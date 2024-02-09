const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { v4 } = require('uuid');


const Blog = require('../modules/Blog');

const blogsFilePath = path.join(__dirname, '..', 'data', 'blogs.json');




let blogs = JSON.parse(fs.readFileSync(blogsFilePath));
let comments = Blog.getAllComments();

exports.renderAddBlogs = (req, res) => {
    res.render('add-blog', { blogs });
}

exports.addBlogs = (req, res) => {
    const { title, username, content } = req.body;

    const newBlog = Blog.addBlog(title, username, content);
    blogs.push(newBlog);

    fs.writeFileSync(blogsFilePath, JSON.stringify(blogs));

    res.redirect('/blogs');
}

exports.renderBlogs = (req, res) => {
    res.render('blogs', { blogs });
}

exports.renderSingleBlog = (req, res) => {
    const blogId = req.params.id;
    const blog = Blog.findById(blogId, blogs);

    if (blog) {
        res.render('blog-detail', { blog });
    } else {
        res.status(404).send('Blog not found');
    }
}

exports.addComments = (req, res) => {
    const blogId = req.params.id;
    const { comment } = req.body;

    const blog = Blog.findById(blogId, blogs);

    if (blog) {
        
        blog.comments.push({ id: v4(), content: comment });


        fs.writeFileSync(blogsFilePath, JSON.stringify(blogs));

       
        Blog.saveComments(blog.comments);

       
        res.redirect(`/blogs/${blogId}`);
    } else {
        res.status(404).send('Blog not found');
    }
}


