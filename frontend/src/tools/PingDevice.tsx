import Button from "../components/Button.tsx";
import { devicePattern } from "../utils/patterns.ts";
import { ChangeEvent, FormEvent, useState } from "react";
import { pingDevice } from "../api/Api.ts";
import Status from "../components/Status.tsx";
import Input from "../components/Input.tsx";
import { JOBS_STATUS } from "../types/types.ts";

export default function PingDevice() {
    const [device, setDevice] = useState("");
    const [status, setStatus] = useState<JOBS_STATUS>(JOBS_STATUS.IDLING);
    const [error, setError] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDevice(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setStatus(JOBS_STATUS.PENDING);
        pingDevice(device)
            .then((res) => {
                setStatus(res.result ? JOBS_STATUS.SUCCESS : JOBS_STATUS.UNSUCCESS);
            })
            .catch((err) => {
                setError("Something went wrong during the request.");
                setStatus(JOBS_STATUS.IDLING);
                throw err;
            });
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 mt-10 sm:mx-auto w-full md:max-w-sm">
            <h4 className="font-bold text-left mb-4">Ping device</h4>
            <form className="space-y-4" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="device"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                    >
                        Device Address
                    </label>
                    <div className="mt-2">
                        <Input
                            name="device"
                            value={device}
                            onChange={handleChange}
                            pattern={devicePattern}
                            title="Må passe med formatet: XX.YY.ZZZ"
                            placeholder="1.1.1"
                        />
                    </div>
                </div>
                <div>
                    <Button text="Ping device" />
                </div>
            </form>
            <Status
                status={status}
                error={error}
                pending="Pinging..."
                success="Device says hello"
                unsuccess="Device did not respond"
            />
        </div>
    );
}
