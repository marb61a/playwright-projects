import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor } from '../support/wait-for-behaviour'
import { inputValueOnPage } from '../support/html-behaviour'

Then(
    /^I fill in the "([^"]*)" input on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) with "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, input: string) {
        const {
            screen: { page, context },
            globalConfig
        } = this

        console.log(`I fill in the ${elementKey} input on the ${elementPosition} tab|window with ${input}`)

        
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async() => {
            let pages = context.pages()

            const result = await pages[pageIndex].waitForSelector(elementIdentifier, {
                state: 'visible'
            })

            if(result) {
                await inputValueOnPage(pages, pageIndex, elementIdentifier, input)
            }

            return result
        })
    }
)
