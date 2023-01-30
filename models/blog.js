const mongoose = require('mongoose');
const Schema = mongoose.Schema;//this is a constructor function

const blogSchema = new Schema({//this creates a new instance of schema object, and we need to pass in an object as a parameter(this object can describe the structure that we want to store in our blog collection)
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    image :
    {
        data: Buffer,
        contentType: String,
        // required : true
    }
},{timestamps : true})//Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true

const Blog = mongoose.model('Blog',blogSchema);//model takes in as 1st arg the name of the model(whatever name we pass mongoose will pluralise it and look for it in the database),2nd arg : schema we want to base it on  

module.exports = Blog;