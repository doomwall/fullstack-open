const Login = ({ user, username, password, setUsername, setPassword, handleLogin, handleLogout }) => {

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
                    username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
                    password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
        <br></br>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        <h2>
                logged in as {user.username}
        </h2>
        <button type="submit">logout</button>
      </form>
      <br></br>
    </div>
  )
}

export default Login