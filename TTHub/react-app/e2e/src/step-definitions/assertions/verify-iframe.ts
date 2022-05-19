import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor, waitForResult, waitForSelectorInIframe } from '../../support/wait-for-behaviour'
import { 
    getIframeElement,
    getElementWithinIframe,
    getTextWithinIframeElement
} from '../../support/html-behaviour'
import { logger } from '../../logger'

// Asserts iframe value is displayed or not (If negative is needed)
Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iframeKey: string, negate: boolean) {
        const {
            screen: { page},
            globalConfig
        } = this

        logger.log(`The ${elementKey} on the ${iframeKey} should ${negate?'not ':''} be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)

        await waitFor(async() => {
            const elementIframe = await getIframeElement(page, iframeIdentifier)

            if (elementIframe) {
                const isElementVisible = await getElementWithinIframe(elementIframe, elementIdentifier) != null
                if (isElementVisible === !negate) {
                    return {result: waitForResult.PASS}
                } else {
                    return {result: waitForResult.FAIL, replace: elementKey}
                }
            } else {
                return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }
        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `Expected ${elementKey} to ${negate ? 'not ' : ''}be displayed`
        })
    }
)

// Asserts that iframe text is contained (Or not contained in negative version)
Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementKey: ElementKey,
        iframeKey: string,
        negate: boolean,
        expectedElementText: string
    ) {
        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`the ${elementKey} should ${negate?'not ':'' }contain the text ${expectedElementText}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)

        await waitFor(async() => {
            const elementIframe = await getIframeElement(page, iframeIdentifier)

            if (elementIframe) {
                const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier)

                if (elementStable) {
                    const elementText = await getTextWithinIframeElement(elementIframe, elementIdentifier)

                    if (elementText?.includes(expectedElementText) === !negate) {
                        return {result: waitForResult.PASS}
                    } else {
                        return {result: waitForResult.FAIL, replace: elementKey}
                    }
                } else {
                    return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
                }
            } else {
                return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }
        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `Expected ${elementKey} to ${negate ? 'not ' : ''}contain the text ${expectedElementText}`
        })
    }
)

// Asserts that text is equal (or not if using the negative version)
Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementKey: ElementKey,
        iframeKey: string,
        negate: boolean,
        expectedElementText: string
    ) {
        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`the ${elementKey} should ${negate?'not ':'' }equal the text ${expectedElementText}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)

        await waitFor(async() => {
            const elementIframe = await getIframeElement(page, iframeIdentifier)

            if (elementIframe) {
                const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier)
                if (elementStable) {
                    const elementText = await getTextWithinIframeElement(elementIframe, elementIdentifier)
                    if ((elementText === expectedElementText) === !negate) {
                        return {result: waitForResult.PASS}
                    } else {
                        return {result: waitForResult.FAIL, replace: elementKey}
                    }
                } else {
                    return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
                }
            } else {
                return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }
        },
        globalConfig, {
            target: elementKey,
            failureMessage: `Expected ${elementKey} to ${negate ? 'not ' : ''}equal the text ${expectedElementText}`
        })
    }
)