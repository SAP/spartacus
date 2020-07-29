export const units = {
  orgUnitsList: {
    orgUnitManagement: 'Units',
    create: 'Create new Unit',
  },
  orgUnitTree: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    upOneLevel: 'Up one level',
  },
  orgUnit: {
    header: 'Details for {{code}}',
    uid: 'ID',
    name: 'Name',
    approvalProcess: 'Approval process',
    parentUnit: 'Parent Unit',
    edit: 'Edit',
    disable: 'Disable',
    enable: 'Enable',
    status: 'Status',
    back: 'Show Units',
    active: 'Active',
    deactivated: 'Deactivated',
    confirmDeactivation: {
      title: 'Disable Unit',
      message: 'Are you sure you want to disable this unit?',
    },
    details: 'Details',
    children: 'Child Units',
    costCenters: 'Cost Centers',
    users: 'Users',
    approvers: 'Approvers',
    manageAddresses: 'Addresses',
    shippingAddresses: 'Shipping Addresses',
  },
  messages: {
    enabled:
      'When you disable this unit, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled unit.',
  },
  orgUnitForm: {
    create: 'Create Unit',
    edit: 'Edit Unit',
    update: 'Update Unit',
    uid: {
      label: 'Unit ID',
      placeholder: 'ID',
    },
    name: {
      label: 'Unit name',
      placeholder: 'Name',
    },
    parentOrgUnit: {
      label: 'Parent business unit',
      placeholder: 'Select business unit',
    },
    approvalProcess: {
      label: 'Approval process',
      placeholder: 'Select approval process',
    },
  },
  unitUsers: {
    header: 'Users in {{code}}',
    back: 'Close',
    assignRoles: 'Manage Roles',
    newUser: 'New user',
    changeUserRoles: 'Change user roles',
  },
  unitAssignRoles: {
    header: 'Manage roles in {{code}}',
    back: 'Back',
    instructions: {
      check: "To assign a role to a user, select the role's check box.",
      uncheck: "To remove a role, clear the role's check box.",
      changes: 'Changes are saved automatically.',
    },
  },
  unitApprovers: {
    header: 'Approvers in {{code}}',
    back: 'Close',
    assignApprovers: 'Manage Approvers',
    newApprover: 'New approver',
  },
  unitAssignApprovers: {
    header: 'Manage approvers in {{code}}',
    back: 'Back',
    instructions: {
      check: "To assign an approver to this unit, select the user's check box.",
      uncheck: "To remove aa approver, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
  },
  unitManageAddresses: {
    header: 'Manage addresses in {{code}}',
    create: 'Create new Address',
    back: 'Back to unit',
    id: 'ID',
    name: 'Name',
    formattedAddress: 'Details',
    confirmDeleteAddress: {
      title: 'Confirm address delete',
      message: 'Are you sure you want to delete this address?',
    },
  },
  unitAddressDetails: {
    header: 'Details for {{name}}',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    id: 'ID',
    name: 'Name',
    unit: 'Unit',
    details: 'Details',
  },
  unitAddressCreate: {
    header: 'New shipping address for {{code}}',
    create: 'Create',
  },
  unitAddressEdit: {
    header: 'Edit shipping address for {{code}}',
    update: 'Update',
  },
  unitAddressForm: {
    title: 'Title',
    firstName: {
      label: 'First name',
      placeholder: 'First Name',
    },
    lastName: {
      label: 'Last name',
      placeholder: 'Last Name',
    },
    address1: 'Address 1',
    address2: 'Address 2 (optional)',
    country: 'Country',
    city: {
      label: 'City',
      placeholder: 'City',
    },
    state: 'State',
    zipCode: {
      label: 'Zip code',
      placeholder: 'Postal Code/Zip',
    },
    phoneNumber: {
      label: 'Phone number (optional)',
      placeholder: '(555) 555 - 0123',
    },
    saveAsDefault: 'Save as default',
    chooseAddress: 'Choose address',
    streetAddress: 'Street Address',
    aptSuite: 'Apt, Suite',
    selectOne: 'Select One...',
  },
  unitCostCenters: {
    header: 'Cost centers in {{code}}',
    back: 'Close',
    create: 'Create',
    code: 'Code',
    name: 'Name',
    new: 'New cost center',
  },
  unitChildren: {
    header: 'Child Units in {{code}}',
    back: 'Close',
    create: 'Create',
    id: 'ID',
    name: 'Name',
    newChild: 'New child unit',
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
