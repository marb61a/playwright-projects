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

export const inputValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    input: string
): Promise <void> => {
    // Focuses on the input which is best practice when dealing with an input
    await page.focus(elementIdentifier)
    await page.fill(elementIdentifier, input)
}

export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    input: string,
): Promise<void> => {
    await pages[pageIndex].focus(elementIdentifier)
    await pages[pageIndex].fill(elementIdentifier, input)
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