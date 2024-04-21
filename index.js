const express = require("express");
const app = express();
const port = 8080;
const methodOverride = require("method-override");
const {v4 : uuidv4} = require('uuid');
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));


let details = [
    {
        id : uuidv4(),
        username : "apnacollege",
        likes : 45,
        comments : 45,
        share : 45,
        img : "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?cs=srgb&dl=pexels-diimejii-3314294.jpg&fm=jpg",
    },
    {
        id : uuidv4(),
        username : "apnacollege",
        likes : 45,
        comments : 45,
        share : 45,
        img : "https://blog.hootsuite.com/wp-content/uploads/2022/06/Instagram-Apps-Cover-Photo-556x556.png",
    },
    {
        id : uuidv4(),
        username : "vaibhav",
        likes : 45,
        comments : 45,
        share : 45,
        img : "https://assets-static.invideo.io/images/large/103_Instagram_Post_Ideas_8_8a54dd5a86.webp",
    },
    {
        id : uuidv4(),
        username : "shradha",
        likes : 45,
        comments : 45,
        share : 45,
        img : "https://static1.agorapulse.com/blog/wp-content/uploads/sites/2/2023/06/Instagram-Stories-vs-Posts-Twitter.jpg",
    },
    {
        id : uuidv4(),
        username : "apnacollege",
        likes : 45,
        comments : 45,
        share : 45,
        img : "https://5.imimg.com/data5/ANDROID/Default/2021/12/NH/GI/FE/68340479/product-jpeg-500x500.png",
    },
];

app.get("/search",(req,res) => {
    console.log(details[0]);
    res.send("working properly");
});
app.get("/instagram",(req,res) => {
    res.render("index.ejs",{details});
});
app.get("/instagram/create",(req,res) => {
    res.render("create.ejs",{details});
});
app.post("/instagram/create",(req,res) => {
    let info = req.body;
    info.id = uuidv4();
    info.img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBqYEUHs9SPync2bo8AmdYjzW5WYicOWF8lreCXnMcQ&s";
    let {id,username,likes,comments,share,img} = info;
    details.push({id,username,likes,comments,share,img});
    res.redirect("/instagram");
});
app.get("/instagram/:id",(req,res) => {
    let {id} = req.params;
    let post = details.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});
app.patch("/instagram/:id",(req,res) => {
    let {id} = req.params;
    let liked = req.body.likes;
    let name = req.body.username;
    let post = details.find((p) => id === p.id);
    post.likes = liked;
    post.username = name;
    console.log(post);
    res.redirect("/instagram");
});
app.delete("/instagram/:id",(req,res) => {
    let {id} = req.params;
    details = details.filter((p) => id !== p.id);
    res.redirect("/instagram");
});
app.listen(port,() => {
    console.log(`listening to port ${port}.....`);
});