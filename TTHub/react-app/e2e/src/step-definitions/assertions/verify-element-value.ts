import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

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