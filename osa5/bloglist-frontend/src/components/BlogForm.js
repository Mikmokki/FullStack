import React,{ useState,useRef,useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './Notification'
import Togglable from './Togglable'

export const BlogForm = ({ errorMessage,setErrorMessage,color, setColor,user,setUser }) => {
  const [title,setTitle] =useState('')
  const [author,setAuthor] =useState('')
  const [url,setUrl] =useState('')
  const noteFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const updateBlogs = () =>  blogService.getAll().then(blogs =>
    setBlogs( blogs )
  )
  useEffect(() => {
    updateBlogs()
  }, [])
  const handlePost = async (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    try {
      await blogService.create({
        title, author, url
      })
      setColor('Green')
      setErrorMessage('posting was successful')
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setErrorMessage('posting failed, try again')
      setColor('Red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (event,blog) => {
    event.preventDefault()
    try {
      await blogService.update(blog.id,{
        blog,likes:blog.likes+1
      })
      setColor('Green')
      setErrorMessage('liking was successful')
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setErrorMessage('something went wrong, try again')
      console.log(exception)
      setColor('Red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setColor('Green')
      setErrorMessage('logging out was successful')
      setUser(null)
    } catch (exception) {
      setErrorMessage('logging out is not working, try again')
      setColor('Red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  const handleDelete =  (event,blog) => {
    event.preventDefault()
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id, user.token).then(
        updateBlogs())
    }}
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} color={color}></Notification>
      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel='create new blog' ref={noteFormRef}>
        <form onSubmit={handlePost}>
          <div><label>title:</label>
            <input id="title" value={title} onChange={({ target }) => setTitle(target.value)}
            /></div>
          <div><label>url:</label>
            <input id="author" value={author} onChange={({ target }) => setAuthor(target.value)}
            /></div>
          <div><label>author:</label>
            <input id="url" value={url} onChange={({ target }) => setUrl(target.value)}
            /></div>

          <button type="submit">Create</button>
        </form>
      </Togglable>
      <div id="blogList">{blogs.sort((a,b) => -a.likes+b.likes).map(blog =>
        <Blog handleLike={handleLike} handleDelete={handleDelete} user={user} key={blog.id} className='blog' blog={blog} />
      )}
      </div>
    </div>
  )}