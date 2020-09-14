export const unit = {
  header: 'All units ({{count}})',
  unit: 'Unit',
  name: 'Name',
  uid: 'ID',
  approvalProcess: 'Approval process',
  parentUnit: 'Parent Unit',
  active: 'Status',
  details: {
    title: 'Unit Details',
    subtitle: 'Unit: {{ item.name }}',
  },
  edit: {
    title: 'Edit unit',
    subtitle: 'Unit: {{ item.name }}',
  },
  create: {
    title: 'Create unit',
    subtitle: '',
  },

  messages: {
    deactivate: 'Are you sure you want to disable this unit?',
    confirmEnabled: 'Unit {{item.name}} enabled successfully',
    confirmDisabled: 'Unit {{item.name}} disabled successfully',
  },

  links: {
    units: 'Child Units',
    users: 'Users',
    approvers: 'Approvers',
    shippingAddresses: 'Shipping Addresses',
    costCenters: 'Cost Centers',
  },

  tree: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    upOneLevel: 'Up one level',
  },
  children: {
    header: 'Child Units in {{code}}',
    newChild: 'New child unit',
  },
  form: {
    parentOrgUnit: 'Parent business unit',
    create: 'Create Unit',
  },
  users: {
    header: 'Users in {{code}}',
    changeUserRoles: 'Change user roles',
    newUser: 'New user',
  },
  assignRoles: {
    header: 'Manage roles in {{code}}',
    instructions: {
      check: "To assign a role to a user, select the role's check box.",
      uncheck: "To remove a role, clear the role's check box.",
      changes: 'Changes are saved automatically.',
    },
  },
  approvers: {
    header: 'Approvers in {{code}}',
    assign: 'Manage Approvers',
    new: 'New approver',
  },
  assignApprovers: {
    header: 'Manage approvers in {{code}}',
    instructions: {
      check: "To assign an approver to this unit, select the user's check box.",
      uncheck: "To remove aa approver, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
  },
  // costCenters: {
  //   header: 'Cost centers in {{code}}',
  //   new: 'New cost center',
  // },
};

export const unitChildren = {
  title: 'Child units',
  subtitle: 'Unit: {{item.name}}',
};

export const unitAssignedRoles = {
  header: 'Manage roles in {{code}}',
  name: 'Name',
  email: 'Email',
  roles: 'Roles',
  roleCustomer: 'Customer',
  roleApprover: 'Approver',
  roleManager: 'Manager',
  roleAdministrator: 'Admin',
};

export const unitApprovers = {
  title: 'Manage approvers',
  subtitle: 'Unit: {{item.name}}',
};

export const unitAssignedApprovers = {
  title: 'Assigned approvers',
  subtitle: 'Unit: {{item.name}}',
  assigned: 'User {{item.name}} assigned successfully',
  unassigned: 'User {{item.name}} unassigned successfully',
};

export const unitAssignedUsers = {
  title: 'Assigned users',
  subtitle: 'Unit: {{item.name}}',
};

export const unitUsers = {
  title: 'Assigned users',
  subtitle: 'Unit: {{item.name}}',
  messages: {
    rolesUpdated: 'Roles successfully updated for {{item.name}}',
  },
};

export const unitCostCenters = {
  title: 'Assigned cost centers',
  subtitle: 'Unit: {{item.name}}',
};

export const unitAddress = {
  title: 'Shipping addresses',
  subtitle: 'Unit: {{item.name}}',

  country: 'Country',
  titles: 'Title',
  firstName: 'First name',
  lastName: 'Last name',
  address1: 'Address',
  address2: '2nd address (optional)',
  city: 'City',
  state: 'State',
  zipCode: 'Zip code',
  phoneNumber: 'Phone number (optional)',
  streetAddress: 'Street Address',
  aptSuite: 'Apt, Suite',
  selectOne: 'Select One...',

  details: {
    title: 'Address details',
    subtitle: 'Unit {{item.name}}',
  },
  edit: {
    title: 'Edit Address',
    subtitle: 'Unit: {{ item.name }} (TODO)',
  },
  create: {
    title: 'Create Address',
    subtitle: 'Unit: {{ item.name }} (TODO)',
  },

  formattedAddress: 'Address',

  // confirmDeleteAddress: {
  //   title: 'Confirm address delete',
  //   message: 'Are you sure you want to delete this address?',
  // },
};

// addressCreate: {
//   header: 'New shipping address for {{code}}',
// },
// addressForm: {
// },
// addressDetails: {
//   header: 'Details for {{name}}',
// },
// addressEdit: {
//   header: 'Edit shipping address for {{code}}',
// },
// }
