import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor, waitForResult, waitForSelector } from '../../support/wait-for-behaviour'
import { logger } from '../../logger'
import { elementChecked } from '../../support/html-behaviour'

Then(
    // Checks if the radio button is checked and also not checked when needed
    /^the "([^"]*)" (?:check box|radio button) should( not )? be checked $/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page},
            globalConfig
        } = this
        
        logger.log(`The ${elementKey} check box | radio button should ${negate?'not ':''}be checked`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const elementStable = await waitForSelector(page, elementIdentifier)

            if(elementStable) {
                const isElementChecked = await elementChecked(page, elementIdentifier)

                if(isElementChecked === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, {
            target: elementKey,
            failureMessage: `Expected ${elementKey} to ${negate ? 'not ' : ''}be checked`
        })

    }
)