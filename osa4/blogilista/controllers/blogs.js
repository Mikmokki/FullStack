const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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
})
module.exports = blogsRouter