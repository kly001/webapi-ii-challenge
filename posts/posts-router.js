const express = require("express");
const router = require("express").Router();
const Posts = require("../data/db.js")

router.get("/" ,(req,res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message:"The posts information could not be retrieved."})
    })
})

router.get("/:id",(req,res) => {
    const{id} = req.params

    Posts.findById(id)
    .then(post => {
        if(post.length>0) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message:`The post with ID# ${id} does not exist`})
        }
    })
    .catch(err => {
        res.status(500).json({message: "The post information could not be retrieved."})
    })
})

router.post("/",(req,res) => {
    const postInfo = req.body
    if(!postInfo.title || !postInfo.contents) {
        res.status(400).json({errorMessage:"Please provide title and contents for the post"})
    } else {
        Posts.insert(postInfo) 
        .then(post => {
            res.status(201).json(post)
        })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the post to the database."})
    })
    }
})

router.delete("/:id", (req,res) => {
    const {id} = req.params
    Posts.remove(id) 
    .then(delPost => {
        if(delPost>0) {
            res.status(200).json({message:"The post has been deleted."})
        } else {
            res.status(404).json({message:`The post with ID# ${id} does not exist.`})
        }
    })
    .catch(err => {
        res.status(500).json({message:"The post could not be removed."})
    })
})

router.put("/:id",(req,res) => {
    const {id} = req.params
    const postInfo = req.body
     if (!postInfo.title || !postInfo.contents) {
         res.status(400).json({errorMessage:"Please provide title and contents for the post."})
     } else {
         Posts.update(id, postInfo)
         .then(post => {
             if(post) {
                 res.status(200).json({message:`The post with Id# ${id} has been updated`})
             } else {
                 res.status(404).json({errorMessage:`The post with Id# ${id} does not exist.`})
             }
         })
         .catch(err => {
             res.status(500).json({err:"The post information could not be modified."})
         })
     }
})

router.get("/:id/comments",(req,res) => {
    const{id} = req.params

    Posts.findCommentById(id)
    .then(post => {
        if(post.length>0) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message:`The post comment with ID# ${id} does not exist`})
        }
    })
    .catch(err => {
        res.status(500).json({message: "The comments information could not be retrieved."})
    })
})


module.exports = router