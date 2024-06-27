import Button from "../components/Button.tsx";
import { groupAddressPattern } from "../utils/patterns.ts";
import Input from "../components/Input.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { readGroupAddress } from "../api/Api.ts";
import Status from "../components/Status.tsx";
import { ReadResponseType } from "../api/ResponseTypes.ts";
import { JOBS_STATUS } from "../types/types.ts";

export default function ReadAddress() {
    const [address, setAddress] = useState("");
    const [response, setResponse] = useState<ReadResponseType | null | undefined>();
    const [error, setError] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setResponse(null);
        readGroupAddress(address)
            .then((res) => {
                setResponse(res);
            })
            .catch((err) => {
                setError("Something went wrong during the request.");
                setResponse(undefined);
                throw err;
            });
    };

    let result: JOBS_STATUS = JOBS_STATUS.IDLING;
    if (response === null) {
        result = JOBS_STATUS.PENDING;
    } else if (response !== undefined) {
        result = response.responded ? JOBS_STATUS.SUCCESS : JOBS_STATUS.UNSUCCESS;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 mt-10 sm:mx-auto w-full md:max-w-sm">
            <h4 className="font-bold text-left mb-4">Read group address</h4>
            <form className="space-y-4" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="group"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                    >
                        Group Address
                    </label>
                    <div className="mt-2">
                        <Input
                            name="group"
                            value={address}
                            onChange={handleChange}
                            pattern={groupAddressPattern}
                            title="Må passe med formatet: XX/Y/ZZZ"
                            placeholder="1/1/1"
                        />
                    </div>
                </div>
                <div>
                    <Button text="Read address" />
                </div>
            </form>
            <Status
                status={result}
                error={error}
                pending="Reading..."
                success={
                    response?.responded === true ? `Value: ${response?.info?.value}${response?.info?.units ?? ""}` : ""
                }
                unsuccess="Could not read value"
            />
        </div>
    );
}
