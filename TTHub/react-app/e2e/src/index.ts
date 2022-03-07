// Import file which holds environmental variable that need to be set
import dotenv from 'dotenv' 
import { env, getJsonFromFile } from './env/parseEnv'
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig
} from './env/global'

dotenv.config({ path: env('COMMON_CONFIG_FILE')})

// Retrives JSON mappings
const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URL_PATH')) 
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH')) 

const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig
}

// Holds arguments instead of using package.json
const common = `./src/features/**/*.feature \
                --require-module ts-node/register \ 
                --require ./src/step-definitions/**/**/*.ts \
                --world-paramters ${JSON.stringify(worldParameters)} \
                -f json:./reports/reports.json \
                --format progress-bar`

// Creates profiles for different test situations (Previously in package.json scripts)
const dev = `${common} --tags '@dev'`
const smoke = `${common} --tags '@smoke'`
const regression = `${common} --tags '@regression'`


export { dev, smoke, regression }