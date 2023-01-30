const express = require('express');//require('express') is returning a function and we are storing it inside express 
const morgan = require('morgan');//request logger middleware
const mongoose = require('mongoose');//We can use mongoose object to connect with the database
const blogRoutes = require('./routes/blogRoutes');

//Express app
const app = express();//Now we are invoking express app and creating a instance of it in app

// connect to mongodb
const dbURI = 'mongodb+srv://Saransh:saran123@cluster0.msrdlbu.mongodb.net/Blog-Platform?retryWrites=true&w=majority';
// const dbURI = 'mongodb+srv://Saransh:saran123@Cluster0.2sebx3d.mongodb.net/Blog-Platform?retryWrites=true&w=majority';//username : Saransh, pass : Saransh123, clustername: Cluster0, databasename : Blog-Platform, collection name : blogs(which will not be used anywhere)
mongoose.set('strictQuery', true);
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})//this is an async task
  .then((result) => app.listen(3000))//After we have connected to the database we will listen to the request
  .catch((err) => console.log(err));

//listen for request
//app.listen(3000);

//register view engine 
app.set('view engine','ejs');//=>ejs will be used to create our templates
//ejs automatically looks into views folder (if we want to change the folder name then we can set ejs to look into that folder by : app.set('views', './views'))

// app.use((req,res,next)=>{
//     console.log('new request made : ');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();//When we fire app.use() it runs every time a req is being made(as code runs from top to bottom) , browser don't know wht to do next so we tell it by saying next()
// });
//If we want to listen to a get request
//middleware and static files
//What is Middleware? It is those methods/functions/operations that are called b/w processing the Request and sending the Response in your application method.
app.use(express.static('public'));
//We can't use every file in our browser directly, so to do so we have to use static class and the folder in which we put files that are of use 

app.use(express.urlencoded({extended : true}));//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
//Parameter: The options parameter contains various property like extended, inflate, limit, verify etc.
//Return Value: It returns an Object

app.use(morgan('dev'));//GET / 304 19.503 ms - -
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

app.get('/',(req,res)=>{//1st arg:What path or url we want to listen to 
//    res.send('<p>HomePage</p>');
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // res.render('index',{title : 'Home', blogs});//Instead of writing blogs alone,we can write blogs: blogs
    res.redirect('/blogs');
  });
  
app.get('/about',(req,res)=>{
    res.render('about',{title : 'About'});
});

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//       title: 'new blog 2',
//       snippet: 'about my new blog',
//       body: 'more about my new blog'
//     });
  
//     blog.save()
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
// 

// app.get('/all-blogs',(req,res) => {
//     Blog.find()//find method on blog model will get us all the blogs(and it is an async task)
//       .then(result => {
//         res.send(result);//result : Set of documents(blogs)
//       })
//       .catch(err => {
//         console.log(err);
//       })
// })

// app.get('/single-blog',(req,res) => {
//     Blog.findById('63bd45e329dcb84e7bb5fb69')
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       })
// })



//redirects
// app.get('/about-me',(req,res)=>{
//     res.redirect('/about');
// })

app.use('/blogs',blogRoutes); //Only use the blogRoutes if the url starts with /blogs

//404(this must always come at the last of the code)
app.use((req,res)=>{
    res.status(404).render('404',{title : '404'});//this works as express will look for the url from top to bottom => if there won't be any matches then this will be fired
});