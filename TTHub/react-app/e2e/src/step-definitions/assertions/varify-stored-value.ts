import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

Then(
    /^the "([^"]*)" should( not)? stored in global values$/,
    async function(
        this: ScenarioWorld,
        elementKey: ElementKey,
        negate: boolean,
        variableKey: string
    ) {
        const {
            screen: {page},
            globalConfig,
            globalVariables
        } = this

        console.log(`The ${elementKey} should ${negate?'not ':''} equal the ${globalVariables[variableKey]} stored in global variables`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const elementText = await page.textContent(elementIdentifier)
            const variableValue = globalVariables[variableKey]
            return (elementText === variableValue) === !negate
        })
    }
)