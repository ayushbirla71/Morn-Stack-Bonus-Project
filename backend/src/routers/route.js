const express = require("express")
const { CreateComment, GetComment, UpdateComment, DeleteComment,UpdateNestedComment } = require("../controller/Comments")
const { CreatePost, GetPost, UpdatePost, DeletePost,GetPostWithComments } = require("../controller/postController")
const router = express.Router()

router.get("/test-me",(req,res)=>{
    res.send("This is the test API")
})

router.post("/createpost",CreatePost)
router.get("/getpost",GetPost)
router.get("/getpostWithComments/:PostId",GetPostWithComments)
router.put("/updatepost",UpdatePost)
router.delete("/deletepost",DeletePost)

router.post("/createcomment",CreateComment)
router.get("/getcomment",GetComment)
router.put("/updatecomment",UpdateComment)
router.put("/updateNestedcomment",UpdateNestedComment)
router.delete("/deletecomment",DeleteComment)


module.exports = router