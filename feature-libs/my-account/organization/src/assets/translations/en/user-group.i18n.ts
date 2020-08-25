export const userGroup = {
  header: 'User groups',
  disabled: '(disabled)',
  uid: 'Code',
  name: 'Name',
  unit: 'Parent Unit',

  messages: {
    enabled:
      'When you disable the user group, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled User Group.',
    deactivate: 'Are you sure you want to disable this user group?',
    deactivateHeader: 'Disable User Group',
  },

  user: {
    link: 'Users',
    header: 'Users in {{code}}',
    assign: 'Assign users',
    assignHeader: 'Assign users in {{code}}',
    unassignAll: 'Unassign All',
    back: 'Back',
    instructions: {
      check: 'To assign a user to this user group, select its check box.',
      uncheck: 'To unassign a user, clear its check box.',
      changes: 'Changes are saved automatically.',
    },
  },

  permission: {
    link: 'Purchase limits',
    header: 'Purchase limits in {{code}}',
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
      QUARTER: 'per Quarter',
    },
  },
};

export const userGroupAssignUsers = {
  name: 'Name',
  uid: 'Email',
  orgUnit: 'Unit',
  roles: 'Roles',
};

export const userGroupAssignPermissions = {
  name: 'Code',
  limit: 'Limit',
  orgUnit: 'Unit',
};
