import { Page } from 'playwright'
import {GlobalConfig, PageId} from '../env/global'

export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    {
        pagesConfig, hostsConfig
    } : GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost'
    } = process.env

    const hostPath = hostsConfig[`${hostName}`]
    console.log("hostpath ", hostPath)

    const url = new URL(hostPath)
    console.log("url ", url)

    const pagesConfigItem = pagesConfig[pageId]
    url.pathname = pagesConfigItem.route
    console.log("Pages route ", url.pathname)

    await page.goto(url.href)
}

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {
    const pageRegexString = pagesConfig[pageId].regex
    const pageRegex = new RegExp(pageRegexString)
    return pageRegex.test(path)
}

// Retrieves and passes current url, it uses regex to ensure that current pageId matches
// current url
export const currentPathMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig
): boolean => {
    // URL is a TS built in function to handle dealing with URL's
    const { pathname: currentPath} = new URL(page.url())
    return pathMatchesPageId(currentPath, pageId, globalConfig)
}
