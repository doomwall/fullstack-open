const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favouriteBlog = (blogs) => {
  var favourite = {}
  var maxValue = 0
  blogs.map((blog) => {
    const likes = blog.likes
    maxValue = Math.max(maxValue, likes)
    if (likes === maxValue) {
      favourite = blog
    }
  })
  return favourite
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}