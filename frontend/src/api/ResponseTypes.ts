export type PingResponseType = {
    result: boolean;
};

export type RestartResponseType = {
    result: boolean;
};

export type ReadResponseType = SuccessReadResponseType | ErrorReadResponseType;

export type ErrorReadResponseType = {
    responded: false;
};

export type SuccessReadResponseType = {
    responded: true;
    info: {
        address: string;
        comment: string;
        data: number | string | boolean;
        datahex: string; // Hex string
        datatype: number;
        decoded: boolean;
        disablelog: 0 | 1;
        highpriolog: 0 | 1;
        id: number;
        name: string;
        tagcache: string;
        units?: string;
        updatetime: number; // UNIX timestamp
        value: number | string | boolean;
    };
};

export type DeviceStateType = {
    address: string;
    status: boolean | null;
};

export type ScanLineResponseType = {
    devices: DeviceStateType[];
    hasError: boolean;
};
