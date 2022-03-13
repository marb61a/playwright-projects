import { Then } from "@cucumber/cucumber";
import { waitFor } from "../support/wait-for-behaviour";
import { getElementLocator } from "../support/web-element-helper";
import { ScenarioWorld } from "./setup/world";
import { ElementKey } from "../env/global";
import { inputValue } from '../support/html-behaviour'

Then(
    /^ I fill in the "([^"]*)" with "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, input: string){
        const {
            screen:{ page },
            globalConfig
        } = this

        console.log(`I fill in the ${elementKey} input with ${input}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, {
                state: 'visible'
            })

            if(result){
                await inputValue(page, elementIdentifier, input)
            }

            return result
        })
    }
)

Then(
    /^ I select the "([^"]*)" option from the "([^"]*)"$/,
    async function(){
        
    }
)