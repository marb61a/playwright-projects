// Import file which holds environmental variable that need to be set
import dotenv from 'dotenv' 
import fs from "fs"

import { env, getJsonFromFile } from './env/parseEnv'
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig,
    EmailsConfig,
    PageElementMappings
} from './env/global'
import { generateCucumberRuntimeTag } from './support/tag-helper'

const environment = env('NODE_ENV')

dotenv.config({ path: env('COMMON_CONFIG_FILE')})
// Retrieves the environmental variables depending on environment  (localhost or production)
dotenv.config({ path: `${env('ENV_PATH')}${environment}.env`})

// Retrieves JSON mappings
const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH')) 
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH')) 
const emailsConfig: EmailsConfig = getJsonFromFile(env('EMAILS_URLS_PATH'))

const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`)

const getEnvList = (): string[] => {
    const envList = Object.keys(hostsConfig)

    if(envList.length === 0) {
        throw Error(`No environments mapped in your ${env('HOSTS_URLS_PATH')}`)
    }

    return envList
}

const pageElementMappings: PageElementMappings = mappingFiles.reduce(
    (pageElementConfigAcc, file) => {
        const key = file.replace('.json', '')
        const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`)
        // Returns each page and associated mappings
        return{
            ...pageElementConfigAcc,
            [key]: elementMappings
        }
    }, {}
)

const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig,
    emailsConfig,
    pageElementMappings
}

// Holds arguments instead of using package.json
const common = `./src/features/**/*.feature \
                --require-module ts-node/register \ 
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters ${JSON.stringify(worldParameters)} \
                -f json:./reports/reports.json \
                --format progress-bar\
                --parallel ${env('PARALLEL')}\
                --retry ${env('RETRY')}`

// Creates profiles for different test situations (Previously in package.json scripts)
const dev = generateCucumberRuntimeTag(common, environment, getEnvList(), 'dev')
const smoke = generateCucumberRuntimeTag(common, environment, getEnvList(), 'smoke')
const regression = generateCucumberRuntimeTag(common, environment, getEnvList(), 'regression')


export { dev, smoke, regression }