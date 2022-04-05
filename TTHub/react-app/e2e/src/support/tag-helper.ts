// Takes in common parameters from index.js, environment parameters
// a list of available environments and finally cucumber tags 
export const generateCucumberRuntimeTag = (
    commonConfig: string,
    runtimeEnv: string,
    availableEnvList: string[],
    runtimeTag: string
): string => {
    const tagExpression = availableEnvList
        .filter(e => e !== runtimeEnv)
        .map(e => `(@${runtimeTag} and not @${e})`)
        .join(' and ')
    
    return `${commonConfig} --tags ${tagExpression}`
}
