const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { v4 } = require('uuid');

const app = express();
const port = 3000;

let blogs = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/add-blog', (req, res) => {
  res.render('add-blog', { blogs });
});

app.post('/blogs', (req, res) => {
  const { title, username, content } = req.body;

  const blog = {
    id: v4(),
    title,
    username,
    content,
    comments: [] 
  };

  blogs.push(blog);

  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  res.render('blogs', { blogs });
});

app.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const blog = blogs.find(blog => blog.id === blogId);

  if (blog) {
    res.render('blog-detail', { blog });
  } else {
    res.status(404).send('Blog nije pronadjen');
  }
});

app.post('/blogs/:id/comments', (req, res) => {
  const blogId = req.params.id;
  const blog = blogs.find(blog => blog.id === blogId);

  if (blog) {
    const { comment } = req.body;
    blog.comments.push({ comment });
    res.redirect(`/blogs/${blogId}`);
  } else {
    res.status(404).send('Blog nije pronadjen');
  }
});

app.listen(port);

