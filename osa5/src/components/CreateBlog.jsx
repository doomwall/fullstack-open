import { useState, useImperativeHandle } from 'react'

const CreateBlog = ({ user, title, author, url, setTitle, setAuthor, setUrl, addBlog, blogFormRef }) => {
  const [createVisible, setCreateVisible] = useState(false)

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setCreateVisible(!createVisible)
  }

  useImperativeHandle(blogFormRef, () => {
    return { toggleVisibility }
  })

  if (user) {
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>create a blog</button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={addBlog}>
            <div>
              <label>
                            title:
                <input
                  type="text"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                            author:
                <input
                  type="text"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                        url:
                <input
                  type="text"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </label>
            </div>
            <button type="submit">
                    create
            </button>
          </form>
          <button onClick={toggleVisibility}>cancel</button>
        </div>

        <br></br>
      </div>
    )
  }

}

export default CreateBlog