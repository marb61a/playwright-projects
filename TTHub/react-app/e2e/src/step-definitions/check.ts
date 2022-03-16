import { Then } from "@cucumber/cucumber";

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor } from '../support/wait-for-behaviour'
import { checkElement, uncheckElement } from '../support/html-behaviour'

// Adding check and uncheck allows for leveraging negate which can be used on checkboxes as these
// elements can be checked and unchecked unlike radio buttons
Then(
    /^I (check)?(uncheck)? the "({^"}*)" (?:check box|radio button) $/,
    async function(this: ScenarioWorld, checked: boolean, unchecked: boolean, elementKey: ElementKey) {
        const {
            screen: { page},
            globalConfig
        } = this

        console.log(`I ${unchecked?'uncheck ':'check'} the ${elementKey} check box|radio button`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, {
                state: 'visible'
            })

            if(result){
                if(!!unchecked){
                    await uncheckElement(page, elementIdentifier)
                } else {
                    await checkElement(page, elementIdentifier)
                }
            }

            return result
        })
    }
)