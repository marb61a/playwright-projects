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

        await waitFor(async () => {
            // Retrieve table with table broken into array of strings
            // It is in the waitFor to avoid errors when trying to fetch data before it is
            // actually available, it will continue to retry until the maximum limit has been reached
            const dataBefore = await page.$$eval(elementIdentifier+"tbody tr", (rows) => {
                return rows.map(row => {
                    const cells = row.querySelectorAll('td')
                    return Array.from(cells).map(cell => cell.textContent)
                })
            })

            return JSON.stringify(dataBefore) === JSON.stringify(dataTable.raw()) === !negate
        })
    }
)