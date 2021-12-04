const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error.message });
    }
});

//get specific post
router.get("/:postId", async (req, res) => {
    try {
        let id = req.params.postId;
        const post = await Post.findById(id);
        res.json(post);
    } catch (error) {
        res.json({ message: error.message });
    }
});
//add a post
router.post("/add", async (req, res) => {
    const post = new Post({ ...req.body });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

//update specific post
router.patch("/:postId", async (req, res) => {
    try {
        let id = req.params.postId;
        const updatedPost = await Post.updateOne(
            { _id: id },
            { $set: { title: req.body.title } },
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});
//delete specific post
router.delete("/:postId", async (req, res) => {
    try {
        let id = req.params.postId;
        const removedPost = await Post.remove({ _id: id });
        res.json(removedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;
