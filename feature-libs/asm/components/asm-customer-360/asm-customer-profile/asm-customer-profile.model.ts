import { Address, PaymentDetails } from "@spartacus/core";

export interface CustomerProfileData {
  billingAddress?: Address;
  deliveryAddress?: Address;
  phone1?: String;
  phone2?: String;
  paymentInfoList?: PaymentDetails[];
};
