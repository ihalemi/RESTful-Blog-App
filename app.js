// ======================================================================================
// SETUP
// ======================================================================================
const express          = require('express'), 
      app              = express(),
      mongoose         = require('mongoose'), 
      bodyParser       = require('body-parser'), 
      methodOverride   = require('method-override'), 
      expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // so that we can serve our custom CSS 
app.use(expressSanitizer());
app.use(methodOverride("_method")); // treat POST requests as a PUT request instead

// SCHEMA & MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String, 
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// ======================================================================================
// RESTFUL ROUTES
// ======================================================================================

// ROOT ROUTE
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // sanitize the post content before creating
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            // then redirect to /blogs
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE 
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    // sanitize the post content before updating
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // update blog
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" +req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

// ======================================================================================
// LAUNCH SERVER 
// ======================================================================================
app.listen(3000, process.env.IP, function() {
    console.log("Server successfuly started!");
});