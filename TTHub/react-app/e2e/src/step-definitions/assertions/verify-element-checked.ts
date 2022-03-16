import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

Then(
    // Checks if the radio button is checked and also not checked when needed
    /^the "([^"]*)" (?:check box|radio button) should( not )? be checked $/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page},
            globalConfig
        } = this
        
        console.log(`The ${elementKey} check box | radio button should ${negate?'not ':''}be checked`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const isElementChecked = await page.isChecked(elementIdentifier)

            // Needs to check whether button is checked or not (true === true and false === false)
            return isElementChecked === !negate
        })

    }
)