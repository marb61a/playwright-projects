import {test, expect} from '@playwright/test'

test("Basic test", async({page}) => {
    // Using example.com as site for testing
    await page.goto("https://www.example.com")
    
    // Verify title is seen
    const pageTitle = await page.locator('h1')

    await expect(pageTitle).toContainText("Example Domain")
})

test("Clicking on elements", async({page}) => {
    // Use the zero webappsecurity page for the example
    await page.goto("http://zero.webappsecurity.com/index.html")

    // Click on the signin button
    await page.click("#signin_button")

    // Select the sign in button using Playwright which can selec element by text
    await page.click("text=Sign in")

    // Create error message variable which will be used in assertion
    const errorMessage = await page.locator(".alert-error")

    // Check the error message is ok
    await expect(errorMessage).toContainText("Login and/or password are wrong")
})

// test ("selectors", async ({page}) => {
//     // Will be only demoing examples without specific site
//     // Text will always just be the value of the text exactly !!!
//     await page.click('text=some text')

//     // CSS Selectors can be various things such as class or id
//     await page.click('button')
//     // ID
//     await page.click('#button')
//     //Class
//     await page.click('.button')

//     // Only visible CSS selector : click on button only if visible
//     await page.click('button:visible')

//     // Combinations this can be any combination
//     await page.click('#button .first')

//     // XPath - use any valid XPath
//     await page.click('//button')
// })

test("Work with inputs", async({page}) => {
    
})