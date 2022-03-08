import { Page } from 'playwright'
import {
    ElementKey,
    ElementLocator,
    GlobalConfig,
    GlobalVariables
} from '../env/global'

export const getElementLocator = (
    page: Page,
    elementKey: ElementKey,
    globalVariables: GlobalVariables,
    globalConfig: GlobalConfig
) : ElementLocator => {
    // Gets the page element mappings from the global config
    const { pageElementMappings } = globalConfig

    // Retrieves the currently set currentScreen variable from the global variables
    const currentPage = globalVariables.currentScreen
    
    // If the current page does not exist then try use the common json mapping file
    return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common[elementKey]
}