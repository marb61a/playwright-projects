import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor } from '../support/wait-for-behaviour'

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
        const elementIframe = await getIFrameElement(page, iframeIdentifier)

        await waitFor(async() => {
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