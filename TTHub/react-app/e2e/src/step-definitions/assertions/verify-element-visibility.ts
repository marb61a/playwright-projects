import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

Then(
    /^the "([^"]*)" should( not)? be displayed/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`The ${elementKey} should ${negate?'not':''} be displayed`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        // Element identifier cannot be passed directly to a toBeVisible() function
        const locator = page.locator(elementIdentifier)

        // Expect from playwright does not work well with custom waitFor functionality so is replaced
        await waitFor(async() => {
            const isElementVisible = (await page.$(elementIdentifier)) != null
            // Returns whether true or false
            return isElementVisible === !negate
        })
    }
)