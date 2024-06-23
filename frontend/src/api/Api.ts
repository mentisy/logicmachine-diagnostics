import { PingResponseType, ReadResponseType, RestartResponseType, ScanLineResponseType } from "./ResponseTypes";

export async function pingDevice(address: string) {
    return fetching<PingResponseType>("ping", { address: address });
}

export async function restartDevice(address: string) {
    return fetching<RestartResponseType>("restart", { address: address });
}

export async function readGroupAddress(address: string) {
    return fetching<ReadResponseType>("read", { address: address });
}

export async function scanLine(devices: string[]) {
    return fetching<ScanLineResponseType>("scan", { devices: devices });
}

async function fetching<T>(url: string, data: object) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiSuffix = import.meta.env.VITE_API_SUFFIX;

    return (await fetch(apiUrl + url + apiSuffix, {
        method: "post",
        body: "data=" + JSON.stringify(data),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    }).then((res) => res.json())) as T;
}
