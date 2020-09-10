export const user = {
  header: 'All users ({{count}})',
  disabled: '(disabled)',
  uid: 'Email',
  active: 'Status',
  name: 'Name',
  firstName: 'Fist name',
  lastName: 'Last name',
  email: 'Email',
  orgUnit: 'Unit',
  unit: 'Unit',
  roles: 'Roles',
  title: 'Title',
  assignApprover: 'Add to the approvers list',

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
    permission: 'Permission',
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

  password: {
    title: 'Change password',
    subtitle: '',
    newPassword: 'New password',
    confirmPassword: 'Retype new password',
  },
};

export const userApprovers = {
  title: 'Assigned approvers',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Unit assigned successfully',
  unassigned: 'Unit unassigned successfully',
};

export const userAssignApprovers = {
  title: 'Approvers',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Unit assigned successfully',
  unassigned: 'Unit unassigned successfully',
};

export const userPermissions = {
  title: 'Assigned permissions',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Permission assigned successfully',
  unassigned: 'Permission unassigned successfully',
};

export const userAssignPermissions = {
  title: 'Permissions',
  subtitle: 'User: {{ item.name }}',
  assigned: 'Permission assigned successfully',
  unassigned: 'Permission unassigned successfully',
};

export const userUserGroups = {
  title: 'User groups',
  subtitle: 'User: {{ item.name }}',
  assigned: 'User group "{{item.name}}" assigned successfully',
  unassigned: 'User group "{{item.name}}" unassigned successfully',
};

export const userAssignUserGroups = {
  title: 'Assigned User groups',
  subtitle: 'User: {{ item.name }}',
  assigned: 'User group "{{item.name}}" assigned successfully',
  unassigned: 'User group "{{item.name}}" unassigned successfully',
};
