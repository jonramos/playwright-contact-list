import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/PageManager'

test('load successful', { tag: '@smoke' }, async ({ page }) => {
    const pm = new PageManager(page)
    await pm.homePage.goto()

    await expect(page).toHaveTitle('Contact List App')
})

test('wrong username and password', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.homePage.goto()

    // login
    await page.getByRole('textbox', { name: 'Email' }).fill('wrong-user')
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong-password')

    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.locator('#error')).toContainText('Incorrect username or password')

})

test('empty credentials', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.homePage.goto()

    // login
    await page.getByRole('textbox', { name: 'Email' }).fill('')
    await page.getByRole('textbox', { name: 'Password' }).fill('')

    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.locator('#error')).toContainText('Incorrect username or password')

})

test('username-only', async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/')

    // login
    await page.getByRole('textbox', { name: 'Email' }).fill('admin')

    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.locator('#error')).toContainText('Incorrect username or password')

})

test('password-only', async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/')

    // login
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')

    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.locator('#error')).toContainText('Incorrect username or password')

})