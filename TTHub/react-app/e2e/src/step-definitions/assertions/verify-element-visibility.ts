import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'

Then(
    /^the "([^"]*)" should contain the text "(.*)"$/,
    async function(elementKey: string, expectedElementText: string) {
        const {
            screen: {page}
        } = this

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`)

        const content = await page.textContent("[data-id='contacts']")

        expect(content).toBe(expectedElementText)

    }
)

Then(
    /^the "([^"]*)" should be displayed/,
    async function (elementKey: string) {
        const {
            screen: {page},
            globalVariables,
            globalConfig
        } = this

        console.log(`The ${elementKey} should be displayed`)

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)

        await expect(elementIdentifier).toBeVisible()
    }
)