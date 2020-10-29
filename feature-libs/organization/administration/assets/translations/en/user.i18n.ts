export const user = {
  header: 'All users ({{count}})',
  disabled: '(disabled)',
  uid: 'Email',
  active: 'Status',
  name: 'Name',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  orgUnit: 'Unit',
  unit: 'Unit',
  roles: 'Roles',
  title: 'Title',

  unitApprover: `Unit approver`,
  assignApprover: 'Add the user to approvers for the unit',

  actions: '',

  byName: 'Sort by name',
  byUnit: 'Sort by unit',

  details: {
    title: 'User Details',
    subtitle: 'User: {{ item.name }}',
  },
  edit: {
    title: 'Edit User',
    subtitle: 'User: {{ item.name }}',
  },
  create: {
    title: 'Create User',
    subtitle: '',
  },

  links: {
    password: 'Change password',
    approvers: 'Approvers',
    userGroup: 'User groups',
    permission: 'Purchase limits',
  },

  messages: {
    deactivate: 'Are you sure you want to disable this user?',
    confirmEnabled: 'User {{item.name}} enabled successfully',
    confirmDisabled: 'User {{item.name}}  disabled successfully',
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
      uncheck: "To remove an approver, clear the user's check box.",
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

  password: {
    title: 'Change password',
    subtitle: '',
    newPassword: 'New password',
    confirmPassword: 'Retype new password',
  },

  breadcrumbs: {
    list: 'All users',
    details: '{{name}}',
    userGroups: 'User groups',
    approvers: 'Approvers',
    permissions: 'Purchase limits',
  },
};

export const userAssignedApprovers = {
  title: 'Assigned approvers',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Approver assigned successfully',
  unassigned: 'Approver unassigned successfully',
};
export const userApprovers = {
  title: 'Manage approvers',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Approver assigned successfully',
  unassigned: 'Approver unassigned successfully',
};

export const userAssignedPermissions = {
  title: 'Assigned purchase limits',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Purchase limit assigned successfully',
  unassigned: 'Purchase limit unassigned successfully',
};

export const userPermissions = {
  title: 'Manage purchase limits',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Purchase limit assigned successfully',
  unassigned: 'Purchase limit unassigned successfully',
};

export const userAssignedUserGroups = {
  title: 'Assigned user groups',
  subtitle: 'User: {{ item.name }}',
  assigned: 'User group "{{item.name}}" assigned successfully',
  unassigned: 'User group "{{item.name}}" unassigned successfully',
};

export const userUserGroups = {
  title: 'Manage user groups',
  subtitle: 'User: {{ item.name }}',
  assigned: 'User group "{{item.name}}" assigned successfully',
  unassigned: 'User group "{{item.name}}" unassigned successfully',
};
