import { Then } from "@cucumber/cucumber";

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor, waitForResult, waitForSelector } from '../support/wait-for-behaviour'
import { checkElement, uncheckElement } from '../support/html-behaviour'
import {logger} from "../logger"

// Adding check and uncheck allows for leveraging negate which can be used on checkboxes as these
// elements can be checked and unchecked unlike radio buttons
Then(
    /^I (check)?(uncheck)? the "({^"}*)" (?:check box|radio button) $/,
    async function(this: ScenarioWorld, checked: boolean, unchecked: boolean, elementKey: ElementKey) {
        const {
            screen: { page},
            globalConfig
        } = this

        logger.log(`I ${unchecked?'uncheck ':'check'} the ${elementKey} check box|radio button`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)
            if (elementStable) {
                if (!!unchecked) {
                    await uncheckElement(page, elementIdentifier)
                    return waitForResult.PASS
                } else {
                    await checkElement(page, elementIdentifier)
                    return waitForResult.PASS
                }
            }
            return waitForResult.ELEMENT_NOT_AVAILABLE
        },
        globalConfig,
        {target: elementKey})
    }
)