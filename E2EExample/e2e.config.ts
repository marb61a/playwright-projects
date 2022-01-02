import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    use: {
        headless: true,

    },
    projects: [
        {
            name: 'Chromium',
            use: {browserName: 'chromium'}
        }
    ]
}

export default config