import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing'
    }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Testing')
  expect(element).toBeDefined()
})


test('clicking view gives url, likes and username', async () => {
  const blog = {
    title: 'Testing with Vite',
    author: 'Test Tester',
    url: 'http://test.com',
    likes: 10,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  render(
    <Blog blog={blog} />
  )

  const urlFirst = screen.queryByText('http://test.com')
  expect(urlFirst).toBeNull()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('http://test.com')
  const likes = screen.getByText('likes 10')
  const username = screen.getByText('testuser')

  expect(button).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(username).toBeDefined()
})

test('clicking like button twice works twice', async () => {
  const blog = {
    title: 'Testing with Vite',
    author: 'Test Tester',
    url: 'http://test.com',
    likes: 10,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} handleLikes={mockHandler} />
  )

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  const buttonLike = screen.getByPlaceholderText("like-button")
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})