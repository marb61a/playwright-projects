import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'
import { getValue } from '../../support/html-behaviour'

Then(
    /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`the ${elementKey} should ${negate?'not':''} contain the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        // Expect from playwright does not work well with custom waitFor functionality so is replaced
        await waitFor(async() => {
            const elementText = (await page.textContent(elementIdentifier))
            // Return will verify whether true or false
            return elementText?.includes(expectedElementText) === !negate
        })

    }
)

Then(
    /^the "([^"]*)" should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`the ${elementKey} should ${negate?'not':''} equal the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const elementText = (await page.textContent(elementIdentifier))
            // Return will verify whether true or false
            return (elementText === expectedElementText) === !negate
        })
    }
)

Then(
    /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
    async function(elementKey: ElementKey, negate: boolean, elementValue: string) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`the ${elementKey} should ${negate?'not':''} equal the value ${elementValue}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const elementAttributes = await getValue(page, elementIdentifier)
            return elementAttributes?.includes(elementValue) === !negate
        })
    }
)