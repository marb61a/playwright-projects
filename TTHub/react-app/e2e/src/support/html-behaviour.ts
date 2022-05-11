import { Frame, Page } from 'playwright'
import { ElementLocator } from '../env/global'
import {ElementHandle} from "@playwright/test"

// Click Section
export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise <void> => {
    await page.click(elementIdentifier)
}

export const clickElementAtIndex = async(
    page: Page,
    elementIdentifier: ElementLocator,
    elementPosition: number
) : Promise<void> => {
    // nth allows for selecting 1 or more elements based on source order according to a formula
    const element = await page.$(`${elementIdentifier}>>nth=${elementPosition}`)
    await element?.click()
}

// Check Section
export const checkElement = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.check(elementIdentifier)
}

export const uncheckElement = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.uncheck(elementIdentifier)
}

export const elementChecked = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<boolean | null> => {
    const checked = await page.isChecked(elementIdentifier)
    return checked
}

// IFrame Section
export const inputValueOnIframe = async(
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise<void> => {
    await elementIframe.fill(elementIdentifier, inputValue)
}

export const getIframeElement = async(
    page: Page,
    iframeIdentifier: ElementLocator
) : Promise<Frame | undefined | null> => {
    const elementHandle = await page.$(iframeIdentifier)
    const elementIframe = await elementHandle?.contentFrame()
    return elementIframe
}

export const getElementWithinIframe = async(
    elementIframe: Frame,
    elementIdentifier: ElementLocator
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
    const visibleOnIframeElement = await elementIframe?.$(elementIdentifier)

    return visibleOnIframeElement
}

export const getTextWithinIframeElement = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
): Promise<string | null> => {
    const textOnIframeElement = await elementIframe?.textContent(elementIdentifier)
    return textOnIframeElement
}

// Page Section
export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    input: string,
): Promise<void> => {
    await pages[pageIndex].focus(elementIdentifier)
    await pages[pageIndex].fill(elementIdentifier, input)
}

export const getTitleWithinPage = async (
    page: Page,
    pages: Array<Page>,
    pageIndex: number,
): Promise<string | null> => {
    const titleWithinPage = await pages[pageIndex].title()

    return titleWithinPage
}

export const getElementOnPage = async(
    page: Page,
    elementIdentifier: ElementLocator,
    pages: Array<Page>,
    pageIndex: number,
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
    const elementOnPage = await pages[pageIndex].$(elementIdentifier)
    
    return elementOnPage
}

export const getElementTextWithinPage = async (
    page: Page,
    elementIdentifier: ElementLocator,
    pages: Array<Page>,
    pageIndex: number,
): Promise<string | null> => {
    const textWithinPage = await pages[pageIndex].textContent(elementIdentifier)

    return textWithinPage
}

export const selectElementValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise <void> => {
    await page.focus(elementIdentifier)
    await page.selectOption(elementIdentifier, option)
}

// When asserting on attribute text
export const getAttributeText = async(
    page: Page,
    elementIdentifier: ElementLocator,
    attribute: string
): Promise<string | null> => {
    const attributeText = page.locator(elementIdentifier).getAttribute(attribute)
    return attributeText
}

export const scrollIntoView = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = page.locator(elementIdentifier)
    await element.scrollIntoViewIfNeeded()
}