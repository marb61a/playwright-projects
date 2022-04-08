import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor } from '../support/wait-for-behaviour'
import { scrollIntoView } from '../support/html-behaviour'

Then(
    /^I scroll to the "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: {page},
            globalConfig
        } = this

        logger.log(`I scroll to the ${elementKey}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            const result = await page.waitForSelector(elementIdentifier, {
                state: 'visible'
            })

            if(result){
                await scrollIntoView(page, elementIdentifier)
            }

            return result
        })
    }
)