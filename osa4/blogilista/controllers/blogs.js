const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

<<<<<<< HEAD
blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
=======
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})
blogsRouter.get('/:id', async (request, response) => {
    try {
        const resultBlog = await Blog.findById(request.params.id)
        response.json(resultBlog.toJSON())
    } catch (error) {
        response.status(404).end()
    }
})
blogsRouter.post('/', async (request, response, next) => {
    console.log(request.body.title,request.body.url)
    try {
        if ((request.body.title == undefined) || (request.body.url== undefined)) return (response.status(400).end())
        const blog = new Blog(request.body)

        const result = await blog.save()
        response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
>>>>>>> e71cead67ea4fc02671445a20f9a7845c8a2ef74
})
blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params
    await Blog.findByIdAndRemove(id)

})

blogsRouter.put('/:id', async (request, response) => {
    const { body } = request
    const { id } = request.params

    const blogObject = {
        likes: body.likes,
    }

<<<<<<< HEAD
blogsRouter.post('/', async (request, response) => {
  const { body } = request

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
=======
    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        blogObject,
        { new: true }
    )

    if (updatedBlog) {
        response.status(200).json(updatedBlog.toJSON())
    } else {
        response.status(404).end()
    }
>>>>>>> e71cead67ea4fc02671445a20f9a7845c8a2ef74
})

blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id)

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)

  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'You are not authorized to delete this blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const { id } = request.params

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter