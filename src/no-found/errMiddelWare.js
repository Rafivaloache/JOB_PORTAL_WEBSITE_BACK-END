

export const notFound = (req, res, next) => {

    if(res.status(404)){
        return res.status(404).json({message: "Not Found"})
    }
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 400 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

