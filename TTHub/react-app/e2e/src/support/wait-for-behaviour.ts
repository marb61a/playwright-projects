import { Page, Frame } from "playwright";

import { 
    ElementLocator,
    GlobalConfig,
    WaitForTarget,
    WaitForTargetType
} from "../env/global";
import { envNumber } from "../env/parseEnv";
import {handleError} from "./error-helper";
import { logger } from "../logger";

export const enum waitForResult {
    PASS = 1,
    FAIL = 2,
    ELEMENT_NOT_AVAILABLE=3
}

export type waitForResultWithContext = {
    result: waitForResult
    replace?: string
}

// Surrounds an assertion
export const waitFor = async <T>(
    predicate: () => waitForResult | Promise<waitForResult> | waitForResultWithContext | Promise<waitForResultWithContext>, 
    globalConfig: GlobalConfig,
    // Question mark operator shows variable is optional !!
    options?: {
        timeout?:number;
        wait?:number;
        target?: WaitForTarget; 
        type?: WaitForTargetType, 
        failureMessage?: string
    }
): Promise<void> => {
    const {
        timeout= 20000, wait=2000, target = '', type = 'element'
    } = options || {}

    // New sleep resolves the promise
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const startDate = new Date()
    let notAvailableContext: string | undefined

    try {
        
    } catch (error) {
        handleError(globalConfig.errorsConfig, error as Error, target, type)
    }
}

export const waitForSelector = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<boolean> =>{
    try{
        await page.waitForSelector(elementIdentifier, {
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT')
        })

        return true
    } catch(e) {
        return false
    }
}

export const waitForSelectorOnPage = async(
    page: Page,
    elementIdentifier: ElementLocator,
    pages: Array<Page>,
    pageIndex: number
): Promise<boolean> => {
    try {
        await pages[pageIndex].waitForSelector(elementIdentifier, {
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT')
        })

        return true
    } catch (e) {
        return false
    }
}

export const waitForSelectorInIframe = async(
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
): Promise<boolean> => {
  try {
    await elementIframe?.waitForSelector(elementIdentifier, {
      state: 'visible',
      timeout: envNumber('SELECTOR_TIMEOUT')
    })

    return true
  } catch (e) {
    return false
  }

}