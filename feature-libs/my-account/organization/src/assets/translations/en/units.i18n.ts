export const unit = {
  header: 'Units',
  unit: 'Unit',
  name: 'Name',
  uid: 'ID',
  approvalProcess: 'Approval process',
  parentUnit: 'Parent Unit',
  back: 'Back',
  confirmDeactivation: {
    title: 'Disable Unit',
    message: 'Are you sure you want to disable this unit?',
  },
  deactivated: 'Deactivated',
  details: 'Details',
  children: 'Child Units',
  costCenters: 'Cost Centers',
  users: 'Users',
  approvers: 'Approvers',
  manageAddresses: 'Addresses',
  shippingAddresses: 'Shipping Addresses',
  messages: {
    enabled:
      'When you disable this unit, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled unit.',
  },
  orgUnitTree: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    upOneLevel: 'Up one level',
  },
  orgUnit: {
    header: 'Details for {{code}}',
  },
  unitChildren: {
    header: 'Child Units in {{code}}',
    newChild: 'New child unit',
  },
  orgUnitForm: {
    parentOrgUnit: 'Parent business unit',
    create: 'Create Unit',
  },
  unitUsers: {
    header: 'Users in {{code}}',
    changeUserRoles: 'Change user roles',
    newUser: 'New user',
  },
  unitAssignRoles: {
    header: 'Manage roles in {{code}}',
    instructions: {
      check: "To assign a role to a user, select the role's check box.",
      uncheck: "To remove a role, clear the role's check box.",
      changes: 'Changes are saved automatically.',
    },
  },
  unitApprovers: {
    header: 'Approvers in {{code}}',
    assignApprovers: 'Manage Approvers',
    newApprover: 'New approver',
  },
  unitAssignApprovers: {
    header: 'Manage approvers in {{code}}',
    instructions: {
      check: "To assign an approver to this unit, select the user's check box.",
      uncheck: "To remove aa approver, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
  },
  unitManageAddresses: {
    header: 'Manage addresses in {{code}}',
    create: 'Create new Address',
    confirmDeleteAddress: {
      title: 'Confirm address delete',
      message: 'Are you sure you want to delete this address?',
    },
  },
  unitAddressCreate: {
    header: 'New shipping address for {{code}}',
  },
  unitAddressForm: {
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
  unitAddressDetails: {
    header: 'Details for {{name}}',
  },
  unitAddressEdit: {
    header: 'Edit shipping address for {{code}}',
  },
  unitCostCenters: {
    header: 'Cost centers in {{code}}',
    new: 'New cost center',
  },
};

export const unitAssignRoles = {
  header: 'Manage roles in {{code}}',
  name: 'Name',
  email: 'Email',
  roles: 'Roles',
  roleCustomer: 'Customer',
  roleApprover: 'Approver',
  roleManager: 'Manager',
  roleAdministrator: 'Admin',
};

export const unitAssignApprovers = {
  name: 'Name',
  email: 'Email',
  roles: 'Roles',
  orgUnit: 'Unit',
};
