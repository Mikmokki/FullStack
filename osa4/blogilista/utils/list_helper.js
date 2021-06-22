const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.map(b => b.likes).reduce((x, y) => x + y, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((x, y) => { return (x && x.likes > y.likes) ? x : y; }, null)
}
const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);
const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author)
  if (authors.length === 0) {
    return null
  }
  const count = authors.reduce((a, b) => {
    a[b] ? a[b]++ : (a[b] = 1)
    return a
  }, {})
  const best = Object.entries(
    count,
  ).reduce((a, b) => (count[a[0]] > count[b[0]] ? a : b))
  return {
    author: best[0],
    blogs: best[1],
  }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authors = blogs.map((blog) => blog.author)
  let noDublos = [...new Set(authors)]

  const likes = noDublos.map((author) => {
    const authorBlogs = blogs.filter((blog) => blog.author === author)
    const countlikes = authorBlogs.reduce(
      (res, newOne) => res + newOne.likes,
      0,
    )
    return {
      author: author,
      likes: countlikes,
    }
  })
  return likes.reduce((a, b) => (a.likes > b.likes ? a : b))
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostLikes, mostBlogs
}