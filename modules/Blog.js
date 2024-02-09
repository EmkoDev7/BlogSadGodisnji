const fs = require('fs');
const path = require('path');
const blogsFilePath = path.join(__dirname, '..', 'data', 'blogs.json');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { v4 } = require('uuid');


class Blog {
    constructor(id, title, username, content, comments) {
        this.id = id;
        this.title = title;
        this.username = username;
        this.content = content;
        this.comments = comments;
    }

    static addBlog(title, username, content) {
        const id = v4();
        return new Blog(id, title, username, content, []);
    }

    
    

    static findById(blogId, blogs) {
        return blogs.find(blog => blog.id === blogId);
    }

    static getAllComments() {
        const commentsFilePath = path.join(__dirname, '..', 'data', 'comments.json');
        try {
            const commentsData = fs.readFileSync(commentsFilePath);
            return JSON.parse(commentsData);
        } catch (error) {
            console.error('Error reading comments file:', error);
            return [];
        }
    }

    static saveComments(comments) {
        const commentsFilePath = path.join(__dirname, '..', 'data', 'comments.json');
        try {
            fs.writeFileSync(commentsFilePath, JSON.stringify(comments));
        } catch (error) {
            console.error('Error writing comments file:', error);
        }
    }
}

module.exports = Blog;
