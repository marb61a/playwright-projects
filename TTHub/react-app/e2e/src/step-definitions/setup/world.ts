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

    // Exclamation mark makes optional that this is set before being referenced
    screen!: Screen

    async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
        await this.screen?.page?.close()
        await this.screen?.context?.close()
        await this.screen?.browser?.close()

        // This goes to a custom function that will determine a new browser
        // which will be based on an env variable that has been set
        const browser = await this.newBrowser()
        const context = await browser.newContext(contextOptions)
        const page = await context.newPage();

        this.screen = {browser, context, page}

        return this.screen
    }

    private newBrowser = async(): Promise<Browser> => {
        const automationBrowsers = ['chromium', 'firefox', 'webkit']

        type AutomationBrowser = typeof automationBrowsers[number]
        const automationBrowser = env('UI_AUTOMATION_BROWSER') as AutomationBrowser
    }
 }