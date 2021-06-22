const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        id: '6765a422da71b54a23426803',
        title: 'title one',
        author: 'Jean Sibbe',
        url: 'https://web.net',
        likes: 8
    },
    {
        id: '6765a422da71b54a23426804',
        title: 'title two',
        author: 'Sibben Jean',
        url:
            'www.fi',
        likes: 3
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body).toHaveLength(2)
})

test('blogs should contain id property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})
test('amount of blogs should increase by one', async () => {
    const before = await Blog.find({})

    const newPost = {
        id: '6765a422da71b54a23426805',
        title: 'pikku blogi',
        author: 'Mister master',
        url: 'thisisit.fi',
        likes: 22
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const after = await Blog.find({})

    expect(after.length).toBe(before.length + 1)

    const titles = after.map(n => n.title)
    expect(titles).toContain('pikku blogi')
})

test('new blogs has 0 likes if not specified', async () => {
    const newPost = {
        title: 'the new post',
        author: 'MJ',
        url: 'www.jee.fi'
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blog = await Blog.findById({ author: 'MJ' })
    console.log('blogsAfter: ', blog)

    expect(blog.likes).toBe(0)
})


afterAll(() => {
    mongoose.connection.close()
})