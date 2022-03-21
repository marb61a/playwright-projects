import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementPosition: string,
        negate: boolean,
        expectedTitle: string
    ) {
        const {
            screen: { page, context }
        } = this

        console.log(`the ${elementPosition} tab should ${negate?'not ':''}contain the title ${expectedTitle}`)

        // Regex converts the page number from string to number
        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        await page.waitForTimeout(1000)

        await waitFor(async () => {
            let pages = context.pages()
            const pageTitle = await pages[pageIndex].title()
            return pageTitle?.includes(expectedTitle) === !negate 
        })
    }
)