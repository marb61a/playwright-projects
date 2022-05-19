import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import {
     waitFor,
     waitForResult,
     waitForSelectorOnPage
} from '../../support/wait-for-behaviour'
import {
    getElementOnPage,
    getElementTextWithinPage,
    getTitleWithinPage
} from "../../support/html-behaviour"
import {logger} from "../../logger"

// Verify new tab\page contains title
Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementPosition: string,
        negate: boolean,
        expectedTitle: string
    ) {
        const {
            globalConfig,
            screen: { page, context }
        } = this

        logger.log(`the ${elementPosition} tab should ${negate?'not ':''}contain the title ${expectedTitle}`)

        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        await page.waitForTimeout(2000)

        await waitFor(async () => {
            let pages = context.pages()
            const pageTitle = await pages[pageIndex].title()

            if (pageTitle?.includes(expectedTitle) === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        },
        globalConfig,
        {
            target: expectedTitle,
            failureMessage: `Expected page to ${negate ? 'not ' : ''}contain the title ${expectedTitle}`
        })
    }
)

// Checking whether contact is displayed 
Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
    async function(
        this: ScenarioWorld,
        elementKey: ElementKey,
        elementPosition: string,
        negate: boolean
    ) {
        const {
            screen:{ page, context },
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':'' }be displayed`)
        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            let pages = context.pages()
            const isElementVisible = (await pages[pageIndex].$(elementIdentifier)) != null

            if (isElementVisible === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `Expected ${elementKey} on page to ${negate?'not ':''}be displayed`
        })
    }
)

// Verify label contains expected text
Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementKey: ElementKey,
        elementPosition: string,
        negate: boolean,
        expectedElementText: string
    ) {
        const {
            screen:{ page, context },
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':'' }contain the text ${expectedElementText}`)
        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            let pages = context.pages()
            const elementStable = await waitForSelectorOnPage(page, elementIdentifier, pages, pageIndex)

            if (elementStable) {
                const elementText = await getElementTextWithinPage(page, elementIdentifier, pages, pageIndex)

                if (elementText?.includes(expectedElementText) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }

        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `Expected ${elementKey} on page to ${negate?'not ':''}contain the text ${expectedElementText}`
        })
    }
)

// Verify name text on a tab is as expected
Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementKey: ElementKey,
        elementPosition: string,
        negate: boolean,
        expectedElementText: string
    ) {
        const {
            screen:{ page, context },
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':'' }equal the text ${expectedElementText}`);
        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            let pages = context.pages()          
            const elementStable = await waitForSelectorOnPage(page, elementIdentifier, pages, pageIndex)

            if (elementStable) {
                const elementText = await pages[pageIndex].textContent(elementIdentifier)

                if ((elementText === expectedElementText) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `Expected ${elementKey} on page to ${negate?'not ':''}equal the text ${expectedElementText}`
        })
    }
)