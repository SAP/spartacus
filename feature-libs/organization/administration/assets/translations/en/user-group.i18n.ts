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

  links: {
    user: 'Users',
    permission: 'Purchase limits',
  },

  messages: {
    update: 'User Group {{ item.name }} updated successfully',
    create: 'User Group {{ item.name }} created successfully',
  },

  breadcrumbs: {
    list: 'All user groups',
    details: '{{name}}',
    users: 'Users',
    permissions: 'Purchase limits',
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
  unassignAllConfirmation: 'All users unassigned successfully',
};
export const userGroupAssignedPermissions = {
  title: 'Assigned purchase limits',
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
