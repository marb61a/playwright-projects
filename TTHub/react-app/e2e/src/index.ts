// Import file which holds environmental variable that need to be set
import dotenv from 'dotenv' 
import fs from "fs"
const environment = env('NODE_ENV')

import { env, getJsonFromFile } from './env/parseEnv'
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig,
    PageElementMappings
} from './env/global'

dotenv.config({ path: env('COMMON_CONFIG_FILE')})
// Retrieves the environmental variables depending on environment  (localhost or production)
dotenv.config({ path: `${env('ENV_PATH')}${environment}`})

// Retrieves JSON mappings
const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH')) 
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH')) 

const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`)
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
const dev = `${common} --tags '@dev'`
const smoke = `${common} --tags '@smoke'`
const regression = `${common} --tags '@regression'`


export { dev, smoke, regression }