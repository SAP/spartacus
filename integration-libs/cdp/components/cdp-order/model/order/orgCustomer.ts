import { defaultAddress } from "./defaultAddress";

export interface orgCustomer{
    active: boolean;
    defaultAddress: defaultAddress;
    displayUid: String;
    firstName: String;
    lastName: String;
    name: String;
    selected: boolean;
    uid: String;
}
