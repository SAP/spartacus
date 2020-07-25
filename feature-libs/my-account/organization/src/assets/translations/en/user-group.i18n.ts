export const userGroup = {
  header: 'User groups',
  disabled: '(disabled)',
  uid: 'Code',
  name: 'Name',
  orgUnit: 'Parent Unit',

  messages: {
    enabled:
      'When you disable the user group, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled User Group.',
    deactivate: 'Are you sure you want to disable this user group?',
    deactivateHeader: 'Disable User Group',
  },

  user: {
    header: 'Users',
    assign: 'Assign users',
    back: 'Back',
    instructions: {
      check: 'To assign a user to this user group, select its check box.',
      uncheck: 'To unassign a user, clear its check box.',
      changes: 'Changes are saved automatically.',
    },
  },

  permission: {
    header: 'Purchase limits',
    assign: 'Assign purchase limits',
    back: 'Back',
    instructions: {
      check:
        'To assign a purchase limits to this user group, select its check box.',
      uncheck: 'To unassign a purchase limits, clear its check box.',
      changes: 'Changes are saved automatically.',
    },
    per: {
      undefined: '',
      MONTH: 'per Month',
      YEAR: 'per Year',
      WEEK: 'per Week',
    },
  },
};

export const userGroupAssignUsers = {
  name: 'Name',
  uid: 'Email',
  orgUnit: 'Unit',
};

export const userGroupAssignPermissions = {
  name: 'Code',
  limit: 'Limit',
  orgUnit: 'Unit',
};
