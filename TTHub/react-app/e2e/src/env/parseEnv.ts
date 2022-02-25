// File checks browser environmental variable
export const env = (key: string): string => {
    const value = process.env[key]

    if(!value){
        throw Error(`No environmental variable found for ${key}`)
    }

    return value
}