/* import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()
  const mockSetTitle = vi.fn();
  const mockSetAuthor = vi.fn();
  const mockSetUrl = vi.fn();

  render(<CreateBlog 
    addBlog={addBlog} 
    user={{ name: 'testuser', username: 'testusername' }} 
    title=""
    author=""
    ulr=""
    setTitle={mockSetTitle}
    setAuthor={mockSetAuthor}
    setUrl={mockSetUrl}
    />)

  const button = screen.getByText('create a blog')
  await user.click(button)

  const inputTitle = screen.getByPlaceholderText('title-input')
  const inputAuthor = screen.getByPlaceholderText('author-input')
  const inputUrl = screen.getByPlaceholderText('url-input')
  const sendButton = screen.getByText('create')

  

  await user.type(inputTitle, 'test-title')
  await user.type(inputAuthor, 'test-author')
  await user.type(inputUrl, 'test-url')
  console.log('Input title value:', inputTitle.value)
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls[0][0].title).toBe('test-title')
}) */