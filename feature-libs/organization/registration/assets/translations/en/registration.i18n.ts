export const registrationForm = {
  fields: {
    titleCode: {
      label: 'Title',
      placeholder: 'Title',
    },
    firstName: {
      label: 'First name',
      placeholder: 'First name',
      requiredMessage: 'First name is required.',
    },
    lastName: {
      label: 'Last name',
      placeholder: 'Last name',
      requiredMessage: 'Last name is required.',
    },
    email: {
      label: 'E-mail',
      placeholder: 'E-mail',
      requiredMessage: 'E-mail address is required.',
    },
    message: {
      label: 'Message',
      hint: `An example data for the message field: "Department: Ground support; Position: Chief safe guard; Report to:
      Steve Jackson; Comments: Please create new account for me".`,
    },
  },
};

export const registration = {
  registrationForm,
};
