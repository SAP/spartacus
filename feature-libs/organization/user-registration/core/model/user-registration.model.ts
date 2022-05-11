export interface OrganizationUserRegistration {
  titleCode?: string;
  email: string;
  firstName: string;
  lastName: string;
  message?: string;
}

export interface OrganizationUserRegistrationForm
  extends OrganizationUserRegistration {
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  town?: string;
  region?: string;
  country?: string;
  phoneNumber?: string;
}
