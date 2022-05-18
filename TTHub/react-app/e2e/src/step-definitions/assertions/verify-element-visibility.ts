import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import {
    getElement,
    getElementAtIndex,
    getElements
} from "../../support/html-behaviour"
import { waitFor, waitForResult } from '../../support/wait-for-behaviour'
import { logger } from '../../logger'

Then(
    /^the "([^"]*)" should( not)? be displayed$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: {page},
            globalConfig
        } = this

        logger.log(`The ${elementKey} should ${negate?'not':''} be displayed`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        // Element identifier cannot be passed directly to a toBeVisible() function
        const locator = page.locator(elementIdentifier)

        // Expect from playwright does not work well with custom waitFor functionality so is replaced
        await waitFor(async() => {
            const isElementVisible = await getElement(page, elementIdentifier) != null
            
            if (isElementVisible === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `Expected ${elementKey} to ${negate?'not ':''}be displayed`
        })
    }
)

// Enables working with indexes
Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed$/,
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

        logger.log(`The ${elementPosition} ${elementKey} should ${negate?'not':''} be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const index = Number(elementPosition.match(/\d/g)?.join('')) - 1

        await waitFor(async() => {
            const isElementVisible = await getElementAtIndex(page, elementIdentifier, index) != null

            if (isElementVisible === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `Expected ${elementPosition} ${elementKey} to ${negate?'not ':''}be displayed`
        }) 
    }
)

// Checking if more than 1 of an element is displayed
Then(
    // "(\d*)" matches a digit
    /^I should( not)? see "(\d*)" "([^"]*)" displayed$/,
    async function(
        this: ScenarioWorld,
        count: string,
        elementKey: ElementKey, 
        negate: boolean
    ) {
        const {
            screen: {page},
            globalConfig
        } = this

        logger.log(`I should ${negate?'not':''}see ${count} ${elementKey} displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            // $$ matches all elements matching specified selector, normal assumptions are that
            // there will be multiple occurences of a selector on a page
            const element = await page.$$(elementIdentifier)
            return (Number(count) === element.length) === !negate
        })
    }
)