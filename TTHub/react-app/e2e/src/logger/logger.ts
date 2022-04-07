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

const createLogger = (logLevel: LogLevel): Logger => {
    const activeLogLevels = getLogLevel(logLevel)
    const logger = logFuncAtLevels(activeLogLevels)

    return LOG_LEVELS.reduce(
        (accumulator: Record<string, LogFunction>, level: LogLevel) => ({
            ...accumulator,
            [level]: (...msg: any[]) => logger(level, ...msg)
        }),
        {}
    )
}

export const logLevelIsT = <T extends string>(logLevel: string, options: readonly string[]): logLevel is T => {
    return options.includes(logLevel)
}

export const stringIsOfOptions = <T extends string> (logLevel: string, options: readonly string[]): T => {
    if(logLevelIsT(logLevel, options)) {
        return logLevel as T
    }

    throw Error(`Logger '${logLevel}' needs to be one of`)
}

export const getLogger= (): Logger => {
    if(!loggerSingleton) {
        const logLevel = env('LOG_LEVEL')
        const validLogLevel = stringIsOfOptions<LogLevel>(logLevel, LOG_LEVELS)
        loggerSingleton = createLogger(validLogLevel)
    }

    return loggerSingleton
}