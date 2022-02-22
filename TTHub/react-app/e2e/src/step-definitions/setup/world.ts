import playwright, {
    BrowserContextOptions,
    Page,
    Browser,
    BrowserContext,
    BrowserType
} from "playwright"
import {World, IWorldOptions, setWorldConstructor} from "@cucumber/cucumber"

export type Screen = {
    browser: Browser
    context: BrowserContext
    page: Page
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions){
        super(options)
    }

    screen:Screen

    
}