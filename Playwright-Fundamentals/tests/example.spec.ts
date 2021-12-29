import {test, expect} from '@playwright/test'

test("Basic test", async({page}) => {
    // Using example.com as site for testing
    await page.goto("https://www.example.com")
    
    // Verify title is seen
    const pageTitle = await page.locator('h1')

    await expect(pageTitle).toContainText("Example Domain")
})