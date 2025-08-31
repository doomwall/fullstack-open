import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleBlog = () => {
    setShowInfo(!showInfo)
  }

  if (showInfo) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}   <button onClick={toggleBlog}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes  {blog.likes} <button onClick= {() => handleLikes(blog.id)}>like</button>
        </div>
        <div>
          {blog.user.username}
        </div>
        <div>
          {user && user.username === blog.user.username &&
          <button onClick={() => handleDelete(blog.id)}>remove</button>
          }
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}   <button onClick={toggleBlog}>view</button>
    </div>
  )
}

export default Blog