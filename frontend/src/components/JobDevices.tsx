import { DeviceTabletIcon } from "@heroicons/react/24/outline";
import { JobType } from "../types/types.ts";

type JobDevicesProps = {
    job: JobType;
};

export default function JobDevices({ job }: JobDevicesProps) {
    const deviceStateColor = (status: boolean | null) => {
        return status === null ? "text-indigo-600" : status ? "text-green-600" : "text-red-600";
    };

    return job.devices.map((device) => (
        <li key={device.address}>
            <DeviceTabletIcon className={`${deviceStateColor(device.status)} h-4 inline`} />{" "}
            <span className="align-middle">{device.address}</span>
        </li>
    ));
}
