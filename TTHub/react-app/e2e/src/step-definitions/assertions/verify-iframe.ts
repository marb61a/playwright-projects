import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'
import { getIFrameElement } from '../../support/html-behaviour'

// Asserts iframe value is displayed
Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iFrameName: string, negate: boolean) {
        const {
            screen: { page},
            globalConfig
        } = this

        console.log(`The ${elementKey} on the ${iFrameName} should ${negate?'not ':''} be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iFrameName, globalConfig)
        const elementIframe = await getIFrameElement(page, iframeIdentifier)

        await waitFor(async() => {
            // Check in iframe on current page if element is true or false
            const isElementVisible = (await elementIframe?.$(elementIdentifier)) != null
            return isElementVisible === !negate
        })
    }
)