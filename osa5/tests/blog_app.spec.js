const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test',
        username: 'testuser',
        password: '1234'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'john',
        username: 'john',
        password: 'aaaeee'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('1234')

      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('logged in as testuser')).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('12345')

      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('logged in as testuser')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('1234')

      await page.getByRole('button', { name: 'login'}).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create a blog' }).click()
      await page.getByLabel('title').fill('testi blogi')
      await page.getByLabel('author').fill('testi-mies')
      await page.getByLabel('url').fill('testi-url.com')

      await page.getByRole('button', { name: 'create' }).click()
    
      await expect(page.getByText('a new blog testi blogi by testi-mies added')).toBeVisible()
    })
  })

  describe('When logged in and blog added', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('1234')

      await page.getByRole('button', { name: 'login'}).click()
      
      await page.getByRole('button', { name: 'create a blog' }).click()

      await page.getByLabel('title').fill('testi blogi')
      await page.getByLabel('author').fill('testi-mies')
      await page.getByLabel('url').fill('testi-url.com')

      await page.getByRole('button', { name: 'create' }).click()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by user', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('testi blogi testi-mies')).not.toBeVisible()
    })

    test('a remove button only visible when logged in as right user', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()

        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

        await page.getByLabel('username').fill('john')
        await page.getByLabel('password').fill('aaaeee')

        await page.getByRole('button', { name: 'login'}).click()

        await expect(page.getByText('logged in as john')).toBeVisible()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})