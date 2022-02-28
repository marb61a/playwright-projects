// Holds arguments instead of using package.json

const common = `./src/feature/**/*.feature \
                --require-module ts-node/register \ 
                --require ./src/step-definitions/**/**/*.ts \
                -f json:./reports/reports.json \
                --format progress-bar`

// Creates profiles for different test situations (Previously in package.json scripts)
const dev = `${common} --tags '@dev'`
const smoke = `${common} --tags '@smoke'`
const regression = `${common} --tags @smoke`


export { dev, smoke, regression}