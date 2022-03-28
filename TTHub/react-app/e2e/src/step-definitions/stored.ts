import { Then } from '@cucumber/cucumber'

import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import { waitFor } from '../support/wait-for-behaviour'

Then(
    /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
    async function(){
        
    }
)