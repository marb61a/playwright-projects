import {BeforeAll, Before, AfterAll, After, ITestCaseHookParameter} from "@cucumber/cucumber";
import { getScenarioDescription } from "@cucumber/cucumber/lib/formatter/helpers/pickle_parser";
const {chromium} = require("playwright");

BeforeAll(async() => {
    global.browser = await chromium.launch({
        headless:false,
    })
});

AfterAll(async() => {
    await global.browser.close();
});

Before(async(scenario: ITestCaseHookParameter) => {
    // Allows for passing in parameters to global context
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: './reports/videos/' + scenario.pickle.name,
        }
    })

    global.page = await global.context.newPage();
});

After(async(scenario: ITestCaseHookParameter) => {
    // Use here instead of after all which would create screenshots in every context
    const scenarioStatus = scenario.result?.status

    if(scenarioStatus === 'FAILED'){
        await global.page.screenshot({
            path: `./reports/screenshots/${scenario.pickle.name}.png`
        })
    }

    await global.page.close()
});

