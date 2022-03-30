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

// Enables working with indexes
Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed/,
    async function(
        this: ScenarioWorld,
        elementPosition: string,
        elementKey: ElementKey, 
        negate: boolean
    ) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`The ${elementPosition} ${elementKey} should ${negate?'not':''} be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const index = Number(elementPosition.match(/\d/g)?.join('')) - 1

        await waitFor(async() => {
            const isElementVisible = (await page.$(`${elementIdentifier}>>>nth=${index}`)) != null
            return isElementVisible === !negate
        }) 
    }
)