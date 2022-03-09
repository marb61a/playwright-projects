import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

Then(
    /^the "([^"]*)" should contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, expectedElementText: string) {
        const {
            screen: {page},
            globalConfig,
            globalVariables
        } = this

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)

        const content = await page.textContent("[data-id='contacts']")

        // expect(content).toBe(expectedElementText)

    }
)

Then(
    /^the "([^"]*)" should be displayed/,
    async function (elementKey: ElementKey) {
        const {
            screen: {page},
            globalVariables,
            globalConfig
        } = this

        console.log(`The ${elementKey} should be displayed`)

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)

        // Element identifier cannot be passed directly to a toBeVisible() function
        const locator = page.locator(elementIdentifier)

        // Expect from playwright does not work well with custom waitFor functionality so is replaced
        await waitFor(async() => {
            const isElementVisible = (await page.$(elementIdentifier)) != null
            return isElementVisible
        })
    }
)