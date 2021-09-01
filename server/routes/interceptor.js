const interceptor = (req, res, next) =>
{
    if (!req.session.user && req.url !== '/api/login')
    {
        return res.status(403).json({'msg':'权限不足'})
    }
    next()
}

module.exports = interceptor