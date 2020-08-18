export const user = {
  header: 'Users',
  disabled: '(disabled)',
  uid: 'Email',
  name: 'Name',
  firstName: 'Fist name',
  lastName: 'Last name',
  email: 'Email',
  orgUnit: 'Unit',
  roles: 'Roles',
  title: 'Title',
  assignAprover: 'Add to the approvers list',
  changePassword: {
    link: 'Change password',
    header: 'Change password of {{code}}',
    password: 'New password',
    confirmPassword: 'Retype new password',
  },

  messages: {
    enabled:
      'When you disable the user, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled User.',
    disabledUnit: 'You cannot enable user if unit is disabled.',
    deactivate: 'Are you sure you want to disable this user?',
    deactivateHeader: 'Disable User',
  },

  approver: {
    link: 'Approvers',
    header: 'Approvers in {{code}}',
    assign: 'Assign Approvers',
    assignHeader: 'Assign Approvers in {{code}}',
    back: 'Back',
    new: 'New approver',
    instructions: {
      check: "To assign an approver to this user, select the user's check box.",
      uncheck: "To remove aa approver, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
  },

  userGroup: {
    link: 'User groups',
    header: 'User groups in {{code}}',
    assign: 'Assign user groups',
    assignHeader: 'Assign user groups in {{code}}',
    back: 'Back',
    instructions: {
      check:
        "To assign an user group to this user, select the user's check box.",
      uncheck: "To remove aa user group, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
  },

  permission: {
    link: 'Purchase limits',
    header: 'Purchase limits in {{code}}',
    assign: 'Assign purchase limits',
    assignHeader: 'Assign purchase limits in {{code}}',
    back: 'Back',
    instructions: {
      check: 'To assign a purchase limits to this user, select its check box.',
      uncheck: 'To unassign a purchase limits, clear its check box.',
      changes: 'Changes are saved automatically.',
    },
    per: {
      undefined: '',
      MONTH: 'per Month',
      YEAR: 'per Year',
      WEEK: 'per Week',
      QUARTER: 'per Quarter',
    },
  },
};

export const userAssignApprovers = {
  name: 'Name',
  email: 'Email',
  roles: 'Roles',
  orgUnit: 'Unit',
};

export const userAssignPermissions = {
  name: 'Code',
  limit: 'Limit',
  orgUnit: 'Unit',
};

export const userAssignUserGroups = {
  name: 'Name',
  uid: 'Code',
  orgUnit: 'Unit',
};
