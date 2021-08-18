import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import { BlogForm } from './components/BlogForm'
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [color,setColor] =useState('')
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setColor('Green')
      setErrorMessage('logging in was successful')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials, try again')
      setColor('Red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} color={color}></Notification>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return <BlogForm errorMessage={errorMessage} setErrorMessage={setErrorMessage} color={color} setColor={setColor} user={user} setUser={setUser}/>
}

export default App