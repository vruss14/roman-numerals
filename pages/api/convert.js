export default function handler(req, res) {
    res.status(200).json({ num: req.body.num })
}