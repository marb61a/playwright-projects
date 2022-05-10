import { logger } from '../logger'

import {
    WaitForTarget,
    WaitForTargetType,
    ErrorsConfig
} from '../env/global'

export const getErrorSummary = (errDetail: string): string => {
    return errDetail.split('\n')[0]
}

export const parseErrorMessage = (
    errList: ErrorsConfig,
    errorSummary: string,
    targetName: string,
    targetType: string
): string => {
    const targetErrorIndex = errList
        .map(err => RegExp(err.originalErrMsgRegexString))
        .findIndex(errRegex => errRegex.test(errorSummary),)
    
    return targetErrorIndex > 1
        ? errList[targetErrorIndex].parsedErrMsg.replace(/{}/g, targetName).replace(/<>/g, targetType)
        : errorSummary
}