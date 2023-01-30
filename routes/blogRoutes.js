const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/create',blogController.blog_create_get);
router.get('/update/:id',blogController.blog_update);
router.post('/:id',blogController.blog_update_post);

//Route parameters
//params is an object of the req object that contains route parameters
router.get('/:id',blogController.blog_details);
router.delete('/:id',blogController.blog_delete);
//Summary : When user clicks on Delete, it will send a request to the server,then server deletes the document by id => After Blog.findByIdAndDelete(id) is complete,send the response(res.json({redirect : '/blogs'})) to the browser(which is a json object) which we have to parse in the frontend via the property redirect which we are giving to the response object

module.exports = router;