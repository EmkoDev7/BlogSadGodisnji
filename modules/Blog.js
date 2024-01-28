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

    addComment(comment) {
        this.comments.push({ comment });
    }
}

module.exports = Blog;
