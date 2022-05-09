export const userRegistrationForm = {
  fields: {
    titleCode: {
      label: 'Title',
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
    email: {
      label: 'E-mail',
      placeholder: 'E-mail',
    },
    city: {
      label: 'City/Town',
      placeholder: 'Please select City/Town',
    },
    country: {
      label: 'Country',
      placeholder: 'Select Country',
    },
    state: {
      label: 'State/Province',
      placeholder: 'Select State/Province',
    },
    postalCode: {
      label: 'Zip/Postal code',
      placeholder: 'Zip/Postal code',
    },
    addressLine: {
      label: 'Address',
      placeholder: 'Address',
    },
    secondAddressLine: {
      label: 'Address line 2',
      placeholder: 'Address line 2',
    },
    phoneNumber: {
      label: 'Phone number',
      placeholder: 'Phone number',
    },
    message: {
      label: 'Message',
      placeholder: `An example data for the message field: "Department: Ground support; Position: Chief safe guard; Report to: Steve Jackson; Comments: Please create new account for me".`,
    },
  },
  successFormSubmitMessage:
    'Thank you for registering! A representative will contact you shortly and confirm your access information.',
  formSubmitButtonLabel: 'Send an application',
  goToLoginButtonLabel: 'Already registered? Go to Sign in',
};

export const userRegistration = {
  userRegistrationForm,
};
