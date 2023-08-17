/**
 * Error handler middleware
 */

//error handler for 404
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    error.status = 404
    next(error)
}

//error handler for 500
const serverError = (err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        message: "An error occured: " + err.message,
        stack: err.stack
    })
}

//error handler for 401 
const unauthorized = (err, req, res, next) => {
    res.status(err.status || 401)
    res.json({
        message: "Unauthorized: " + err.message,
        stack: err.stack
    })
}

//error handler for 403
const forbidden = (err, req, res, next) => {
    res.status(err.status || 403)
    res.json({
        message: "Forbidden: " + err.message,
        stack: err.stack
    })
}

module.exports = [notFound, serverError, unauthorized, forbidden];


