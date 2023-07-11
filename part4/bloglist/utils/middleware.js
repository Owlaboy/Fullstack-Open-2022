const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    
    if (authorization && authorization.startsWith('bearer ')) {
        request.token = authorization.replace('bearer ', '')
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    let decodedToken
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch {
        decodedToken = false
    }
    const user = await User.findById(decodedToken.id)

    if (decodedToken) {
        request.user = user
    } else {
        request.user = null
    }
    next()
}


module.exports = {tokenExtractor, userExtractor}