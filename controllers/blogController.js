const Blog = require('../models/blog');


const blog_index = (req,res) => {
    Blog.find().sort({createdAt : -1})//It will sort in descending order(newest to oldest)
      .then(result => {
        res.render('index',{title : 'All blogs', blogs : result});
      })
      .catch(err => {
        console.log(err);
      });
}

const blog_details = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', {title : 'Blog Details', blog: result, date : result.createdAt});
      })
      .catch(err => {
        res.status(404).render('404',{title: 'Blog not found.'});
      });
}

const blog_create_get = (req,res) => {
    res.render('create',{title : 'Create a new blog'});
}

const blog_update = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('update', {title : 'Edit', blog: result, date : result.createdAt});
      })
      .catch(err => {
        res.status(404).render('404',{title: 'Blog not found.'});
      });
}

const blog_create_post = (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
}
//Summary of above code : We have created a blog object using Blog model(with the same type of structure as the schema) which will look for blogs in the database and then saved it using save to the blogs collection, save is an async task (returns a promise) 

const blog_delete = (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({redirect : '/blogs'});
      })
      .catch(err => {
        console.log(err);
      });
}


const blog_update_post = (req,res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, {
    title : req.body.title,
    author : req.body.author,
    body : req.body.body
  },
  (err,docs) => {
    res.redirect(id);
  });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update,
    blog_update_post
}