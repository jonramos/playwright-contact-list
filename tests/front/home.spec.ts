import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager'

test.describe('Home Page', () => {
    test('should load page successfully', { tag: '@smoke' }, async ({ page }) => {
        const pm = new PageManager(page)
        await pm.homePage.goto()

        await expect(page).toHaveTitle('Contact List App')
    })

    test('should login successfully with valid credentials', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.homePage.goto()
        await pm.homePage.loginAs('test@fake.com', 'myPassword')

        await expect(page).toHaveURL(/.*\/contactList/)
        await expect(page.title()).resolves.toMatch('My Contacts')
    })

    const invalidLoginCases = [
        { name: 'wrong username and password', email: 'wrong-user', password: 'wrong-password' },
        { name: 'empty credentials', email: '', password: '' },
        { name: 'username only', email: 'admin', password: '' },
        { name: 'password only', email: '', password: 'admin123' },
    ]

    invalidLoginCases.forEach(({ name, email, password }) => {
        test(`should display error for ${name}`, async ({ page }) => {
            const pm = new PageManager(page)

            await pm.homePage.goto()
            await pm.homePage.loginAs(email, password)

            await expect(page.locator('#error')).toContainText('Incorrect username or password')
        })
    })
})