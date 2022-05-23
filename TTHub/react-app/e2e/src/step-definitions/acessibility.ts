import { Then } from '@cucumber/cucumber'
import {getViolations, injectAxe} from 'axe-playwright'

import { ScenarioWorld } from './setup/world'
import { getCurrentPageId } from "../support/navigation-behaviour"
import {createHtmlReport} from "axe-html-reporter"
import {env} from "../env/parseEnv"
import { logger } from "../logger"

Then(

)
