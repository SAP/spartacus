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
    message: {
      label: 'Message',
      hint: `An example data for the message field: "Department: Ground support; Position: Chief safe guard; Report to:
      Steve Jackson; Comments: Please create new account for me".`,
    },
  },
  successMessage: 'Account has been created successfully!',
};

export const orgUserRegistration = {
  userRegistrationForm,
};
