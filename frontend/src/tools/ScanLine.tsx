import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useJobs from "../hooks/useJobs.tsx";
import ScanLineShortcuts from "../components/ScanLineShortcuts.tsx";
import JobDevices from "../components/JobDevices.tsx";
import Status from "../components/Status.tsx";
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import buildDevices from "../utils/buildDevices.ts";
import { scanLine } from "../api/Api.ts";
import { DeviceStateType, ScanLineResponseType } from "../api/ResponseTypes.ts";
import { JOBS_STATUS } from "../types/types.ts";

export default function ScanLine() {
    const [line, setLine] = useState("");
    const [response, setResponse] = useState<ScanLineResponseType | null | undefined>();
    const [error, setError] = useState("");
    const { jobs, jobsRunning, nextJob, areJobsWaiting, createJobs, startNextJob, jobHasErrors } = useJobs();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLine(event.target.value);
    };

    useEffect(() => {
        if (jobs.length === 0 || !areJobsWaiting) {
            return;
        }
        if (!jobsRunning) {
            startNextJob(null);
        }
        if (nextJob) {
            const jobDevices = nextJob.devices.map((device: DeviceStateType) => device.address);
            scanLine(jobDevices)
                .then((res) => {
                    setResponse(res);
                    startNextJob(res);
                })
                .catch((err) => {
                    setError("Something went wrong during the request.");
                    setResponse(undefined);
                    throw err;
                });
        }
    }, [jobs.length, jobsRunning, nextJob, areJobsWaiting, startNextJob]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const devices = buildDevices(line);
        const devicesState: DeviceStateType[] = devices.map((device) => ({ address: device, status: null }));
        createJobs(devicesState);
        setError("");
        setResponse(null);
    };

    let status: JOBS_STATUS = JOBS_STATUS.IDLING;
    if (areJobsWaiting) {
        status = JOBS_STATUS.PENDING;
    } else if (!jobsRunning && jobs.length > 0) {
        status = jobHasErrors ? JOBS_STATUS.UNSUCCESS : JOBS_STATUS.SUCCESS;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 mt-10 sm:mx-auto sm:w-full">
            <h4 className="font-bold text-left mb-4">Scan line</h4>
            <form className="space-y-4" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                    <div className="flex flex-wrap justify-between">
                        <label
                            htmlFor="line"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                        >
                            Line
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <ScanLineShortcuts />
                        </div>
                    </div>
                    <div className="mt-2">
                        <Input name="line" value={line} onChange={handleChange} placeholder="1.1.1-10" />
                    </div>
                </div>
                <div>
                    <Button text="Scan line" disabled={jobsRunning} />
                </div>
            </form>
            <Status
                status={status}
                error={error}
                pending="Scanning..."
                success={response?.hasError === false ? `Scanning completed successfully` : ""}
                unsuccess={response?.hasError ? `Scanning completed with errors` : ""}
            />
            <div className="mt-4 text-left">
                <ul>
                    {jobs.map((job, index) => (
                        <JobDevices key={index} job={job} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
