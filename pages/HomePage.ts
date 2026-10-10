import { Page } from "@playwright/test"

export class HomePage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/')
    }

    async loginAs(username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(username)
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password)
        await this.page.getByRole('button', { name: 'Submit' }).click()
    }
}