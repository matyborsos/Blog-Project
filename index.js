import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", data_out);
  console.log(data_out);
});

var titles = [];
var posts = [];
var edits = [];
var count = 0;

var data_out = {
    titles: titles,
    posts: posts,
    count: count,
    edits: edits,
};

app.post("/submit", (req, res) => {
    count++;
    titles.push(req.body.title);
    posts.push(req.body.post);
    edits.push("0");
    const data = {
        titles: titles,
        posts: posts,
        count: count,
        edit: edits,
    };
    data_out = data;
    res.render("index.ejs", data);
});

app.post("/patch", (req, res) => {

    titles[pos - 1] = req.body.title;
    posts[pos - 1] = req.body.post;
    edits[pos-1] = "0";
    const data = {
        titles: titles,
        posts: posts,
        count: count,
        edit: edits,
    };
    data_out = data;
    res.render("index.ejs", data);
});

app.post("/delete", (req, res) => {
    pos = req.body.postNumber;
    titles[pos-1] = 0;
    edits[pos-1] = 0;
    posts[pos-1] = 0;
    edits[pos-1] = 0;
    const data = {
        titles: titles,
        posts: posts,
        count: count,
        edit: edits,
    };
    data_out = data;
    res.render("index.ejs", data);
});

var pos; 

app.post("/edit", (req, res) => {
    pos = req.body.postNumber;
    console.log(pos);
    edits[pos-1] = "1";
    const data = {
        titles: titles,
        posts: posts,
        count: count,
        edit: edits,
    };
    data_out = data;
    res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
