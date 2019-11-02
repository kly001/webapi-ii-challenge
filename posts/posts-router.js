const express = require("express");
const router = require("express").Router();
const Posts = require("../data/db.js")

router.get("/" ,(req,res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message:"Error retrieving the posts."})
    })
})

module.exports = router