const express = require("express");
const router = express.Router();
const ejs = require('ejs');
const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'blogs.json');
const Blog = require('../modules/Blog')


let blogs = [];
const blogsData = fs.readFileSync(p);
blogs = JSON.parse(blogsData);




exports.renderAddBlogs = (req, res) => {
    res.render('add-blog', { blogs });
}

exports.addBlogs = (req, res) => {
    const { title, username, content } = req.body;

    const newBlog = Blog.addBlog(title, username, content);
    blogs.push(newBlog);

    fs.writeFileSync(p, JSON.stringify(blogs));

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

    
    const blogIndex = blogs.findIndex(blog => blog.id === blogId);

    if (blogIndex !== -1) {
        
        const { comment } = req.body;

        
        const blogInstance = new Blog(
            blogs[blogIndex].id,
            blogs[blogIndex].title,
            blogs[blogIndex].username,
            blogs[blogIndex].content,
            blogs[blogIndex].comments
        );

       
        blogInstance.addComment(comment);

        
        blogs[blogIndex] = blogInstance;

      
        fs.writeFileSync(p, JSON.stringify(blogs));

       
        res.redirect(`/blogs/${blogId}`);
    } else {
        
        res.status(404).send('Blog nije pronađen');
    }
}

