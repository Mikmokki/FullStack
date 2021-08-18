import React,{ useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog,handleLike,handleDelete,user }) => {
  console.log(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible,setVisible] = useState(false)
  console.log(blog)


  return(<div style={blogStyle} className="blogComponent" id={blog.author}>
    {blog.title} by {blog.author}
    {visible ? <>
      <button style={{ marginLeft: 5 }} onClick={() => setVisible(!visible)}>Hide</button> <br/>
      {blog.url} <br/>
likes {blog.likes} <button style={{ marginLeft: 5 }} onClick={(e) => handleLike(e,blog)}>Like</button>
    </> :<button style={{ marginLeft: 5 }} onClick={() => setVisible(!visible)}>Show</button>}
    {user && blog.user && blog.user.username===user.username && <button id="deleteButton" onClick={e => handleDelete(e,blog)}>Delete</button>}
  </div>
  )}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default Blog