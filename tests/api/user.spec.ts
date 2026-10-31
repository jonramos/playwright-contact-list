import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('/Users', () => {
    test('should create user successfully', async ({ request }) => {
        const response = await request.post('https://thinking-tester-contact-list.herokuapp.com/users', {
            data: {
                firstName: 'Test',
                lastName: 'User',
                email: faker.string.alpha({length: {min: 3, max: 6}})+'@fake.com',
                password: faker.internet.password(),
            },
        })
        const responseBody = await response.json()

        expect(response.status()).toBe(201)
        expect(responseBody.user._id).toBeTruthy()
        expect(responseBody.token).toBeTruthy()

    })

    test('should return 400 when email already exists', async ({ request }) => {
        const response = await request.post('https://thinking-tester-contact-list.herokuapp.com/users', {
            data: {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@fake.com',
                password: 'myPassword',
            },
        })
        const responseBody = await response.json()

        expect(response.status()).toBe(400)
        expect(responseBody.message).toBe('Email address is already in use')
    })
})