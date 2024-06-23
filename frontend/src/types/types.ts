import { DeviceStateType } from "../api/ResponseTypes.ts";

export type JobType = {
    index: number;
    running: boolean;
    awaiting: boolean;
    devices: DeviceStateType[];
};

export enum JOBS_STATUS {
    IDLING = 0,
    PENDING = 1,
    SUCCESS = 2,
    UNSUCCESS = 3,
}
