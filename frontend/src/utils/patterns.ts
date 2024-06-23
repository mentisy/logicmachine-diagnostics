// Device pattern: 1.1.1, 15.15.255
export const devicePattern = "^[0-9]{1,2}.[0-9]{1,2}.[0-9]{1,3}$";

// Line pattern: 1.1, 15.15
export const linePattern = "^[0-9]{1,2}.[0-9]{1,2}$";

// Group address pattern: Either free level (1-65536) or three level (0/0/1 to 31/7/255)
export const groupAddressPattern = "(^[0-9]{1,5}$)|(^[0-9]{1,2}/[0-9]{1,2}/[0-9]{1,3}$)";
