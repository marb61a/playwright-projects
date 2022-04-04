import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor } from '../support/wait-for-behaviour'
import {getIFrameElement, inputValueOnIframe} from '../support/html-behaviour'

Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iFrameName: string, inputValue: string) {
        const {
            screen: { page},
            globalConfig
        } = this

        console.log(`I fill in the ${elementKey} input on the ${iFrameName} with ${inputValue}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iFrameName, globalConfig)

        await waitFor(async() => {
            // elementIframe needs to be inside waitFor as if it is outside then it may cause
            // the test to fail if there is a slow connect, waitFor allows for retrying
            const elementIframe = await getIFrameElement(page, iframeIdentifier)

            const result = await page.waitForSelector(iframeIdentifier, {
                state: 'visible'
            })

            if(result){
                if(elementIframe){
                    await inputValueOnIframe(elementIframe, elementIdentifier, inputValue)
                }
            }

            return result
        })
    }
)