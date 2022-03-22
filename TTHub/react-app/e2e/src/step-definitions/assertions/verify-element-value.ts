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
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, elementValue: string) {
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

// Testing the required text box on the playground page
Then(
    /^the "([^"]*)" should( not)? equal the value "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, elementValue: string) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`the ${elementKey} should ${negate?'not':''} equal the value ${elementValue}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const elementAttribute = await getValue(page, elementIdentifier)
            return (elementAttribute === elementValue) === !negate 
        })
    }
)

// Verifying that the outlined disabled input is disabled
Then(
    /^the "([^"]*)" should( not)? equal be enabled$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`The ${elementKey} should ${negate?'not':''}be enabled`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const isElementEnabled = await page.isEnabled(elementIdentifier)
            return isElementEnabled === !negate
        })
    }
)

// Verifying button value
Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(){
        
    }
)