import { Given } from '@cucumber/cucumber'

import {PageId} from '../env/global'
import { 
    navigateToPage,
    currentPathMatchesPageId,
    reloadPage
} from '../support/navigation-behaviour'
import { waitFor } from '../support/wait-for-behaviour'
import {ScenarioWorld} from './setup/world'
import { logger } from'../logger'

Given(
    /^I am on the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: {page},
            globalConfig
        } = this

        logger.log(`I am on the ${pageId} page`);

        await navigateToPage(page, pageId, globalConfig)

        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig), globalConfig, {
            target: pageId,
            type: 'page'
        })
    }
)

Given (
    /^I directed to the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`I am directed to the ${pageId} page`)

        // Stabilises the framework
        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig), globalConfig, {
            target: pageId,
            type: 'page'
        })
    }
)

// Reassert after a page refresh
Given (
    /^I refresh the "([^"]*)" page$/,
    async function (this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`I refresh the ${pageId} page`)

        await reloadPage(page)

        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig), globalConfig, {
            target: pageId,
            type: 'page',
            timeout: 30000
        })
    }
)
