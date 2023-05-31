const express = require("express")
const log = require("../logger")
const router = express.Router()
const { getAllRequests, requestAccepted } = require("../databaseUtils/request")


// get friends of a user
// example
// [
//     {
//    ubaid id =>   _id: new ObjectId("64280fdf9d42825e5e2a108f"),
//       friend: [ [Object] ]
//     }
//   ]
router.post("/getrequests", (req, res) => {
    try {
        log("req.body", req.body)
        getAllRequests(req.body.id)
            .then(request => {
                res.json({ Success: true, request: request })
            })
            .catch(e => {
                res.status(500).json({ error: e.message, Success: false })
            })

    } catch (e) {
        res.status(500).json({ error: e.message, Success: false })
    }
})

// add friend's id by user's id 
router.post("/requestapproved", (req, res) => {
    try {
        log("req.body", req.body)
        const currentUser_id = req.body.currentUser_id
        const friend_id = req.body.friend_id

        requestAccepted(currentUser_id, friend_id)
            .then(user => {
                res.json({ Success: true, user: user })
            })
            .catch(e => {
                res.status(500).json({ error: e.message, Success: false })
            })

    } catch (e) {
        res.status(500).json({ error: e.message, Success: false })
    }
})
module.exports = router