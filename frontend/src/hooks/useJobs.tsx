import { useState } from "react";
import { DeviceStateType, ScanLineResponseType } from "../api/ResponseTypes.ts";
import { JobType } from "../types/types.ts";

export default function useJobs() {
    const DEVICES_PER_JOB_LIMIT = 20;
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [jobsRunning, setJobsRunning] = useState(false);
    const [jobHasErrors, setJobHasErrors] = useState(false);

    const createJobs = (devices: DeviceStateType[]): void => {
        const tmpJobs = [];
        for (let i = 0, jIndex = 0; i < devices.length; i += DEVICES_PER_JOB_LIMIT, jIndex++) {
            const jobDevices = devices.slice(i, i + DEVICES_PER_JOB_LIMIT);
            tmpJobs.push({
                index: jIndex,
                running: false,
                awaiting: true,
                devices: jobDevices,
            });
        }
        setJobsRunning(false);
        setJobs(tmpJobs);
        setJobHasErrors(false);
    };

    const startNextJob = (currentJobResponse: ScanLineResponseType | null) => {
        const runningJob = jobs.find((job) => job.running);
        const nextJobIndex = (runningJob?.index ?? -1) + 1;
        const nextJob = jobs.find((job) => job.index === nextJobIndex);
        setJobsRunning(true);
        setJobs((prevState) =>
            prevState.map((job) => {
                if (runningJob && job.index === runningJob.index) {
                    job.running = false;
                    job.awaiting = false;
                    job.devices = currentJobResponse ? currentJobResponse.devices : job.devices;
                    if (currentJobResponse?.hasError) {
                        setJobHasErrors(true);
                    }
                }
                if (nextJob && nextJob.index === job.index) {
                    job.running = true;
                }
                return job;
            }),
        );
        if (!nextJob) {
            setJobsRunning(false);
        }
    };

    const nextJob = jobs.find((job) => job.running);
    const areJobsWaiting = jobs.filter((job) => job.awaiting).length > 0;

    return { jobs, nextJob, jobsRunning, jobHasErrors, areJobsWaiting, createJobs, startNextJob };
}
