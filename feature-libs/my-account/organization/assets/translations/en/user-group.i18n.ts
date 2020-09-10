export const userGroup = {
  header: 'All user groups ({{count}})',
  disabled: '(disabled)',
  uid: 'Code',
  name: 'Name',
  unit: 'Unit',
  orgUnit: 'Unit',
  actions: '',

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',
  byGroupID: 'Sort by group',

  details: {
    title: 'User group Details',
    subtitle: 'User group: {{ item.name }}',
  },

  edit: {
    title: 'Edit User group',
    subtitle: 'User group: {{ item.name }}',
  },

  create: {
    title: 'Create User group',
    subtitle: '',
  },

  user: {
    link: 'Users',
    //   header: 'Users in {{code}}',
    //   assign: 'Assign users',
    //   assignHeader: 'Assign users in {{code}}',
    //   unassignAll: 'Unassign All',
    //   back: 'Back',
    //   instructions: {
    //     check: 'To assign a user to this user group, select its check box.',
    //     uncheck: 'To unassign a user, clear its check box.',
    //     changes: 'Changes are saved automatically.',
    //   },
  },

  permission: {
    link: 'Purchase limits',
    //   header: 'Purchase limits in {{code}}',
    //   assign: 'Assign purchase limits',
    //   back: 'Back',
    //   instructions: {
    //     check:
    //       'To assign a purchase limits to this user group, select its check box.',
    //     uncheck: 'To unassign a purchase limits, clear its check box.',
    //     changes: 'Changes are saved automatically.',
    //   },
    //   per: {
    //     undefined: '',
    //     MONTH: 'per Month',
    //     YEAR: 'per Year',
    //     WEEK: 'per Week',
    //     QUARTER: 'per Quarter',
    //   },
  },
};

export const userGroupAssignedUsers = {
  title: 'Assigned users',
  subtitle: 'User group: {{ item.name }}',
  assigned: 'User {{item.name}} assigned successfully',
  unassigned: 'User {{item.name}} unassigned successfully',
};

export const userGroupUsers = {
  title: 'Manage users',
  subtitle: 'User group: {{ item.name }}',
  assigned: 'User {{item.name}} assigned successfully',
  unassigned: 'User {{item.name}} unassigned successfully',
  unassignAll: 'Unassign All',
};
export const userGroupAssignedPermissions = {
  title: 'Assigned Purchase limits',
  subtitle: 'Limit: {{ item.name }}',
  assigned: 'Purchase limits {{item.code}} assigned successfully',
  unassigned: 'Purchase limits {{item.code}} unassigned successfully',
};

export const userGroupPermissions = {
  title: 'Manage purchase limits',
  subtitle: 'Limit: {{ item.name }}',
  assigned: 'Purchase limits {{item.code}} assigned successfully',
  unassigned: 'Purchase limits {{item.code}} unassigned successfully',
};
