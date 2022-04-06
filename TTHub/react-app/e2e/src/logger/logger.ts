import { env } from "../env/parseEnv"

const DEBUG = 'debug'
const LOG = 'log'
const OFF = 'off'

const LOG_LEVELS = [DEBUG, LOG, OFF] as const
export type LogLevel = typeof LOG_LEVELS[number]

type LogFunction = (...msg: any[]) => void

type Logger = {
    debug: LogFunction,
    log: LogFunction
}

let loggerSingleton: Logger | null = null

export const getLogger= (): Logger => {
    if(!loggerSingleton) {
        const logLevel = env('LOG_LEVEL')
        const validLogLevel = stringIsOFOptions<LogLevel>(logLevel, LOG_LEVELS)
        loggerSingleton = createLogger(validLogLevel)
    }

    return loggerSingleton
}