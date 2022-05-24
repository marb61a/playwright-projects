import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor, waitForResult,
    waitForSelector, waitForSelectorInIframe
} from '../support/wait-for-behaviour'
import {getIframeElement, inputValueOnIframe} from '../support/html-behaviour'
import {logger} from "../logger"

Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iframeKey: string, inputValue: string) {
        const {
            screen: { page},
            globalConfig
        } = this

        logger.log(`I fill in the ${elementKey} input on the ${iframeKey} iframe with ${inputValue}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)

        await waitFor(async() => {
            // elementIframe needs to be inside waitFor as if it is outside then it may cause
            // the test to fail if there is a slow connect, waitFor allows for retrying
            const elementIframe = await getIframeElement(page, iframeIdentifier)

            if(elementIframe) {
                const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier)
                if(elementStable) {
                    await inputValueOnIframe(elementIframe, elementIdentifier, inputValue)
                    return {result: waitForResult.PASS }
                } else {
                    return {
                        result: waitForResult.ELEMENT_NOT_AVAILABLE,
                        replace: iframeKey
                    }
                }
            } else {
                return {
                    result: waitForResult.ELEMENT_NOT_AVAILABLE,
                    replace: elementKey
                }
            }
        },
        globalConfig,
        {target: iframeKey})
    }
)