export const unit = {
  header: 'All units ({{count}})',
  unit: 'Unit',
  name: 'Name',
  uid: 'ID',
  approvalProcess: 'Approval process',
  parentUnit: 'Parent Unit',
  back: 'Back',
  active: 'Status',
  confirmDeactivation: {
    title: 'Disable Unit',
    message: 'Are you sure you want to disable this unit?',
  },
  deactivated: 'Deactivated',
  messages: {
    enabled:
      'When you disable this unit, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled unit.',
    disabledParent: 'You cannot enable unit if parent is disabled.',
  },
  tree: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    upOneLevel: 'Up one level',
  },
  details: {
    title: 'Unit Details',
    subtitle: 'Unit: {{ item.name }}',
    children: 'Child Units',
    users: 'Users',
    approvers: 'Approvers',
    shippingAddresses: 'Shipping Addresses',
    costCenters: 'Cost Centers',
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
  manageAddresses: {
    header: 'Manage addresses in {{code}}',
    create: 'Create new Address',
    confirmDeleteAddress: {
      title: 'Confirm address delete',
      message: 'Are you sure you want to delete this address?',
    },
  },
  addressCreate: {
    header: 'New shipping address for {{code}}',
  },
  addressForm: {
    country: 'Country',
    title: 'Title',
    firstName: 'First name',
    lastName: 'Last name',
    address1: 'Address 1',
    address2: 'Address 2 (optional)',
    city: 'City',
    state: 'State',
    zipCode: 'Zip code',
    phoneNumber: 'Phone number (optional)',
    streetAddress: 'Street Address',
    aptSuite: 'Apt, Suite',
    selectOne: 'Select One...',
  },
  addressDetails: {
    header: 'Details for {{name}}',
  },
  addressEdit: {
    header: 'Edit shipping address for {{code}}',
  },
  costCenters: {
    header: 'Cost centers in {{code}}',
    new: 'New cost center',
  },
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

export const unitAssignedApprovers = {
  name: 'Name',
  email: 'Email',
  roles: 'Roles',
  orgUnit: 'Unit',
};
