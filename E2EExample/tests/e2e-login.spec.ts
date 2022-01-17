import { test, expect } from '@playwright/test'

test.describe("Login / logout test", () => {
    // Before hook
    test.beforeEach(async({page}) => {
        await page.goto('http://zero.webappsecurity.com')
    })

    // Negative scenario
    test("Negative Login scenario", async({page}) => {
        await page.click('#signin_button')
        await page.type("#user_login", "invalid username")
        await page.type("#user_password", "invalid password")
        await page.click("text=Sign in")

        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText('Login and/or password are wrong')
    })

    // Positive Scenario then logout
    test("Positive scenario for logging in and logout", async({page}) => {
        await page.click('#signin_button')
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")

        const accountSummarytab = await page.locator("#account_summary_tab")
        await expect(accountSummarytab).toBeVisible()
    })

});
