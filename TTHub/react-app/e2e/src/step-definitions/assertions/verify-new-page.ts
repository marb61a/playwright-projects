import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

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
            screen: { page, context }
        } = this

        console.log(`the ${elementPosition} tab should ${negate?'not ':''}contain the title ${expectedTitle}`)

        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        await page.waitForTimeout(2000)

        await waitFor(async () => {
            let pages = context.pages()
            const pageTitle = await pages[pageIndex].title()
            return pageTitle?.includes(expectedTitle) === !negate 
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

        console.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':'' }be displayed`)
        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            let pages = context.pages()
            const isElementVisible = (await pages[pageIndex].$(elementIdentifier)) != null
            return isElementVisible === !negate
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

        console.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':'' }contain the text ${expectedElementText}`)
        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            let pages = context.pages()
            const elementText = await pages[pageIndex].textContent(elementIdentifier)
            return elementText?.includes(expectedElementText) === !negate
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

        console.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':'' }equal the text ${expectedElementText}`);
        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            let pages = context.pages()
            const elementText = await pages[pageIndex].textContent(elementIdentifier)
            return (elementText === expectedElementText) === !negate
        })
    }
)