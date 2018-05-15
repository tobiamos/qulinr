module.exports = {
    sendJSONResponse(res, status, content) {
        res.status(status);
        res.json(content);
    },
    catchErrors(fn) {
        const caught = (req, res, next) => fn(req, res, next).catch(next);
        return caught;
    },
}