import { Page } from 'playwright'
import { ElementLocator } from '../env/global'

export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise <void> => {
    await page.click(elementIdentifier)
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

export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise <void> => {
    await page.focus(elementIdentifier)
    await page.selectOption(elementIdentifier, option)
}
