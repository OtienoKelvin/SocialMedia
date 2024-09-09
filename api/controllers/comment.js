

const getComments = async (req, res) => {
    const q = "SELECT c.*, u.username, u.profilePic FROM comments c JOIN users u ON c.userId = u.id WHERE c.postId = ? ORDER BY c.createdAt DESC"

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}