const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(function(blog){
        total = total + blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    let favblog = blogs[0]
    blogs.forEach(function(blog){
        if (favblog.likes <= blog.likes){
            favblog = blog
        }  
    })
    return favblog
}

const mostBlogs = (blogs) => {
    const writerMap = new Map()
    blogs.forEach(function(blog){
        if (writerMap.has(blog.author)){
            writerMap.set(blog.author, writerMap.get(blog.author)+1)
        } else {
            writerMap.set(blog.author, 1)
        }})
    let mostliked = null
    writerMap.forEach(function(value, key){
        if (mostliked === null){
            mostliked = key
        }
        else if (writerMap.get(mostliked) <= value){
            mostliked = key
        }
        })
    if (mostliked === null){
        return null
    }
    const mostblogs = {
        author: mostliked,
        blogs: writerMap.get(mostliked)
    }
    return mostblogs
}

const mostLikes = (blogs) => {
    const likesMap = new Map()
    blogs.forEach(function(blog){
        if (likesMap.has(blog.author)){
            likesMap.set(blog.author, likesMap.get(blog.author) + blog.likes)
        } else {
            likesMap.set(blog.author, blog.likes)
        }
    })
    let mostliked = null
    likesMap.forEach(function(value, key){
        if (mostliked === null){
            mostliked = key
        }
        else if (likesMap.get(mostliked) <= value){
            mostliked = key
        }
        })
    if (mostliked === null){
        return null
    }
    const mostlikes = {
        author: mostliked,
        likes: likesMap.get(mostliked)
    }
    return mostlikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}