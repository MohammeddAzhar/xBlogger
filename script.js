import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const blogPosts = [
  {
    date: `18/8/2023`,
    title: `Welcome to my blog`,
    description: `Reflecting on life's journey and the hope for new beginnings.`,
    body: `Half of August has passed and nothing changed.<br>For all I can really do now is stand and wait here for September's rain to wash me and make me
    anew.<br>And if that doesn't work ,<br>I'll wait for October, I'll light a spirit boat and say my goodbyes to the old me and old memories.<br>If that doesn't work,<br>Dear November,<br>I surely hope you'll be kind and show me my way.<br>But if not,<br>At the beginning of December, I'll count down for the New Year and cross my fingers.`,
    id: 1,
  },
  {
    date: `18/11/2023`,
    title: `Software and me`,
    description: `console.log("hello world!");`,
    body: `I am a self taught Fullstack Software Developer; though not having a CSE or IT degree didn't stop me from following my curiosity and intuition and learning software engineering. I like software engineering <em>(it's not that I'm obsessed)</em>, creating software, and learning different tech stacks, languages and technologies especially the <strong>JavaScript</strong> and <strong>React</strong> ecosystem.`,
    id: 2,
  },
  {
    date: `23/11/2023`,
    title: `Serene Moments`,
    description: `Embracing tranquility in the ordinary.`,
    body: `In the soft hues of dawn, find the melody of your heartbeat. "Serene Moments" captures the poetry of everyday life, where the mundane becomes a canvas for serenity. Join me in savoring the beauty in simplicity.`,
    id: 3,
  },
  {
    date: `24/11/2023`,
    title: `Echoes of Laughter`,
    description: `Celebrating joy in the small and the big.`,
    body: `Amidst the chaos, laughter echoes like a timeless melody. "Echoes of Laughter" captures the moments that make your soul dance. Join me in celebrating the symphony of joy that orchestrates our everyday lives.`,
    id: 4,
  },
  {
    date: `26/11/2023`,
    title: `Gratitude Gazette`,
    description: `Nourishing the soul with thankfulness.`,
    body: `In the garden of life, gratitude is the water that makes every flower bloom. "Gratitude Gazette" is a daily dose of appreciation for the little miracles that color our world. Join me in cultivating a garden of thankfulness.`,
    id: 5,
  },
  {
    date: `27/11/2023`,
    title: `Soulful Strolls`,
    description: `Taking mindful steps in the journey of life.`,
    body: `Life is a series of steps, each one a journey in itself. "Soulful Strolls" invites you to walk with purpose and presence, discovering the profound in the simplicity of each step. Let's embark on a mindful journey together.`,
    id: 6,
  },
  {
    date: `29/11/2023`,
    title: `Whispers of Wisdom`,
    description: `Gathering insights from everyday experiences.`,
    body: `Wisdom is not confined to ancient texts; it often whispers through the fabric of our daily lives. "Whispers of Wisdom" is a collection of insights drawn from ordinary moments, offering profound lessons hidden in plain sight.`,
    id: 7,
  },
];

// Set up view engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogPosts });
});

app.get("/create-blog", (req, res) => {
  res.render("create-blog.ejs");
});

app.post("/post-blog", (req, res) => {
  const date = new Date();
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const blogName = req.body.blogName;
  const blogDescription = req.body.blogDescription;
  const blogContent = req.body.blogContent;

  // Check if an ID is provided for an update
  if (req.body.id) {
    const blogToUpdateIndex = blogPosts.findIndex(
      (blog) => blog.id === parseInt(req.body.id)
    );

    if (blogToUpdateIndex !== -1) {
      // Remove the existing blog post
      blogPosts.splice(blogToUpdateIndex, 1);
    }
  }

  const newBlogPost = {
    date: formattedDate,
    title: blogName,
    description: blogDescription,
    body: blogContent,
    id: blogPosts.length + 1,
  };

  blogPosts.push(newBlogPost);

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const deleteId = req.params.id;
  const blogToRemove = blogPosts.findIndex((blog) => blog.id === deleteId);
  blogPosts.splice(blogToRemove, 1);

  res.redirect("/");
});

app.post("/update/:id", (req, res) => {
  const blogId = req.params.id;
  const blogToUpdate = blogPosts.find((blog) => blog.id === parseInt(blogId));

  res.render("create-blog.ejs", { blogToUpdate });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
