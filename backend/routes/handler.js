import express from 'express';
const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "Hello!" })
});

router.get("/lectureList", (req, res) => {
    
});

export default router;