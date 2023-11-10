/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const userRegistrationForm = {
  fields: {
    titleCode: {
      label: 'Title (optional)',
      placeholder: 'Title',
    },
    firstName: {
      label: 'First name',
      placeholder: 'First name',
    },
    lastName: {
      label: 'Last name',
      placeholder: 'Last name',
    },
    companyName: {
      label: 'Company name',
      placeholder: 'Company name',
    },
    email: {
      label: 'E-mail',
      placeholder: 'E-mail',
    },
    city: {
      label: 'City/Town (optional)',
      placeholder: 'Please select City/Town',
    },
    country: {
      label: 'Country (optional)',
      placeholder: 'Select Country',
    },
    state: {
      label: 'State/Province (optional)',
      placeholder: 'Select State/Province',
    },
    postalCode: {
      label: 'Zip/Postal code (optional)',
      placeholder: 'Zip/Postal code',
    },
    addressLine: {
      label: 'Address (optional)',
      placeholder: 'Address',
    },
    secondAddressLine: {
      label: 'Address line 2 (optional)',
      placeholder: 'Address line 2',
    },
    phoneNumber: {
      label: 'Phone number (optional)',
      placeholder: 'Phone number',
    },
    message: {
      label: 'Message (optional)',
      placeholder: `An example data for the message field: "Department: Ground support; Position: Chief safe guard; Report to: Steve Jackson; Comments: Please create new account for me".`,
    },
  },
  messageToApproverTemplate: `Company name: {{companyName}},
  Phone number: {{phoneNumber}},
  Address: {{addressLine}} {{secondAddressLine}} {{city}} {{state}} {{postalCode}} {{country}},
  Message: {{message}}`,
  successFormSubmitMessage:
    'Thank you for registering! A representative will contact you shortly and confirm your access information.',
  formSubmitButtonLabel: 'Register',
  goToLoginButtonLabel: 'Already registered? Go to Sign in',
  httpHandlers: {
    conflict: 'User with this e-mail address already exists.',
  },
};

export const userRegistration = {
  userRegistrationForm,
};
