import { Then } from "@cucumber/cucumber";

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor } from '../support/wait-for-behaviour'

Then(
    /^I check the "({^"}*)" radio button $/,
    async function(this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page},
            globalConfig
        } = this

        console.log(`The ${elementKey} radio button should be checked`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        
    }
)