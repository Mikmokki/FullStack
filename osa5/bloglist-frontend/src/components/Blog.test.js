import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)
describe.only('<Blog />', () => {
  let component
  let handleLike
  let handleDelete
  beforeEach(() => {
    const blog = {
      title: 'el titel',
      author: 'kirjuri',
      url: 'www.fi',
      user: '112233',
      likes: 5
    }
    const user = {
      username: 'mokko'
    }
    handleLike = jest.fn()
    handleDelete = jest.fn()
    component = render(
      <Blog
        blog={blog}
        handleLike={handleLike}
        user={user}
        handleDelete={handleDelete}
      />
    )
  })

  it('renders its title', () => {
    const div = component.container.querySelector('.blogComponent')
    expect(div).toHaveTextContent('el titel')
  })

  it('renders its author', () => {
    const div = component.container.querySelector('.blogComponent')
    expect(div).toHaveTextContent('kirjuri')
  })

  it('click shows url and likes', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)
    const div = component.container.querySelector('.blogComponent')

    expect(div).toHaveTextContent(
      'el titel by kirjuriHide www.fi likes 5 Like'
    )
  })
  it('liking twice will call event handler twice', () => {
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(handleLike.mock.calls).toHaveLength(2)

  })
})