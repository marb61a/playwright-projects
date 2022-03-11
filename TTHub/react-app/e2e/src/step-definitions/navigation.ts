import { Given } from '@cucumber/cucumber'
import {PageId} from '../env/global'
import { 
    navigateToPage,
    currentPathMatchesPageId
} from '../support/navigation-behaviour'
import { waitFor } from '../support/wait-for-behaviour'
import {ScenarioWorld} from './setup/world'

Given(
    /^I am on the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: {page},
            globalConfig
        } = this

        console.log(`I am on the ${pageId} page`);

        await navigateToPage(page, pageId, globalConfig)

        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig))
    }
)

Given (
    /^I directed to the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig
        } = this
        
    }
)