import { DataTable, Then } from '@cucumber/cucumber'

import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import {ScenarioWorld} from '../setup/world'
import { waitFor } from '../../support/wait-for-behaviour'

Then(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`The ${elementKey} table should ${negate?'not':''}equal the following:`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
    }
)