import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
test.describe('Home Page', () => {
    test('should load page successfully', { tag: '@smoke' }, async ({ page }) => {
        const pm = new PageManager(page)
        await pm.homePage.goto()

        await expect(page).toHaveTitle('Contact List App')
    })

    const invalidLoginCases = [
        { name: 'wrong username and password', email: 'wrong-user', password: 'wrong-password' },
        { name: 'empty credentials', email: '', password: '' },
        { name: 'username only', email: 'admin', password: '' },
        { name: 'password only', email: '', password: 'admin123' },
    ]

    for (const { name, email, password } of invalidLoginCases) {
        test(`should display error for ${name}`, async ({ page }) => {
            const pm = new PageManager(page)

            await pm.homePage.goto()
            await pm.homePage.loginAs(email, password)

            await expect(page.locator('#error')).toContainText('Incorrect username or password')
        })
    }
})