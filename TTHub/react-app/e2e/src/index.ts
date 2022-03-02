// Import file which holds environmental variable that need to be set
import dotenv from 'dotenv' 
import { env } from './env/parseEnv'

dotenv.config({ path: env('COMMON_CONFIG_FILE')})

// Holds arguments instead of using package.json
const common = `./src/features/**/*.feature \
                --require-module ts-node/register \ 
                --require ./src/step-definitions/**/**/*.ts \
                -f json:./reports/reports.json \
                --format progress-bar`

// Creates profiles for different test situations (Previously in package.json scripts)
const dev = `${common} --tags '@dev'`
const smoke = `${common} --tags '@smoke'`
const regression = `${common} --tags '@regression'`


export { dev, smoke, regression }