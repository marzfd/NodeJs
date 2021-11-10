const express = require('express');
const fs = require('fs');

const app = express();

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1.1 Creating new posts
app.post('/blogs', (req, res) => {

  // Get the title and content from the request
  const title = req.body.title;
  const content = req.body.content;

  fs.writeFileSync(title, content);
  res.end('ok')
})

// 1.2 Updating existing posts
app.put('/posts/:title', (req, res) => {
  // Get the title and content from the request
  const title = req.body.title;
  const content = req.body.content;

  // If the request does not have a title, return an error
  if (fs.existsSync(title)) {

    fs.writeFileSync(title, content);
    res.end('ok')
  }
  else {
    // Send response with error message
    res.status(400).end('This Post does not exist !')
  }
})

// 1.3 Deleting posts
app.delete('/blogs/:title', (req, res) => {
  // Get the title from the url parameters
  const title = req.params.title;

  if (fs.existsSync(title)) {

    fs.unlinkSync(title);
    res.end('ok');
  }
  else {
    // Respond with message here
    res.status(400).end('This Post does not exist !')
  }
})

// 1.4 Reading posts
app.get('/blogs/:title', (req, res) => {

  // Get the title from the url parameters
  const title = req.params.title;
  // check if post exists
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.json(post);
  }
  else {
    res.status(400).end('This Post does not exist !')
  }
})

// Bonus: Reading all posts
app.get('/blogs' , (req, res) => {

  let posts = [];
  fs.readdirSync('./').forEach(title => {
    // Only get the title of the blog posts
    if (title.includes('blog')) {
    posts.push({title: title});
    }
  })
  res.json(posts);
})


app.listen(3000)