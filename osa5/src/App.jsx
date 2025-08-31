import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const clearInput = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong username or password')
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogFormRef.current.toggleVisibility()

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      clearInput()
    })

    setMessage(`a new blog ${title} by ${author} added`)
    setError(false)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLikes = (id) => {
    const foundBlog = blogs.find(n => n.id === id)
    const changedBlog = { ...foundBlog, likes: foundBlog.likes + 1 }

    blogService.update(id, changedBlog).then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    })
  }

  const handleDelete = (id) => {
    const foundBlog = blogs.find(n => n.id === id)
    const confirmed = confirm(`Remove blog ${foundBlog.title} by ${foundBlog.author}?`)

    if (confirmed) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
    } else {
      return
    }

  }



  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isError={isError}  />

      <Login
        user={user}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      <CreateBlog
        user={user}
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        addBlog={addBlog}
        blogFormRef={blogFormRef}
      />

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
          user={user}
        />
      )}
    </div>
  )
}

export default App