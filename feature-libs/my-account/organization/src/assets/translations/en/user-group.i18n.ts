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
};

export const userGroupAssignUser = {
  name: 'Name',
  code: 'Code',
};
