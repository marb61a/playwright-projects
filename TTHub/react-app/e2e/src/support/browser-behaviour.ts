import { devices } from "playwright";
import { envNumber } from "../env/parseEnv";

export const getViewPort = (): {width: number, height: number} => {
    let viewPort 
    // If the environment has not set an emulation value then use the browser value
    const emulation = process.env.EMULATION || "browser"

    if(emulation != "browser") {
        const device = devices[emulation]
        viewPort = {
            width: device.viewport.width,
            height: device.viewport.height
        }
    } else {
        viewPort = {
            width: envNumber('BROWSER_WIDTH'),
            height: envNumber('BROWSER_HEIGHT')
        }
    }

    return viewPort
}