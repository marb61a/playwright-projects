// Surrounds an assertion
export const waitFor = async <T>(
    predicate: () => T | Promise <T>, 
    // Question mark operator shows variable is optional !!
    options?: {
        timeout?:number;
        wait?:number;
    }
): Promise<T> => {
    const {
        timeout= 20000, wait=2000
    } = options || {}

    // New sleep resolves the promise
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const startDate = new Date()

    while(new Date().getTime() - startDate.getTime() < timeout){
        const result = await predicate();
        if(result) return result

        await sleep(wait)
        console.log(`Waiting ${wait}ms`)
    }

    throw new Error(`Wait time of ${timeout} exceeded`)
}