export const orgUnit = {
  header: 'All units ({{count}})',
  unit: 'Unit',
  name: 'Name',
  uid: 'ID',
  approvalProcess: 'Approval process',
  parentUnit: 'Parent Unit',
  active: 'Status',
  hint:
    'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. The cost centers and shipping addresses available to a buyer when checking out, depend on their unit. Users have access to all child units of their primary unit.',
  details: {
    title: 'Unit Details',
    subtitle: 'Unit: {{ item.name }}',
    hint:
      'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. Disabling a unit disables all children of the unit, including child units, users, approvers, and cost centers. Disabled units cannot be edited.',
  },
  edit: {
    title: 'Edit Unit',
    subtitle: 'Unit: {{ item.name }}',
  },
  create: {
    title: 'Create Unit',
    subtitle: '',
  },

  messages: {
    deactivateTitle: 'Disable this unit?',
    deactivate: `Disabling a unit has wide-ranging affects on your commerce organization. ALL the unit's child units, users, budgets, and cost centers will also disabled.`,
    confirmEnabled: 'Unit {{item.name}} enabled successfully',
    confirmDisabled: 'Unit {{item.name}} disabled successfully',
    update: 'Unit {{ item.name }} updated successfully',
    create: 'Unit {{ item.name }} created successfully',
  },
  info: {
    disabledEdit: 'Enable the unit to allow editing.',
    disabledEnable: 'Parent must be enabled before this unit may be enabled.',
    disabledDisable: 'Root unit can not be disabled.',
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
  },

  children: {
    create: {
      title: 'Create child unit',
      subtitle: '',
    },
    messages: {
      create: 'Unit {{ item.name }} created successfully',
    },
  },

  costCenters: {
    create: {
      title: 'Create cost center',
      subtitle: '',
    },
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
    assign: 'Manage approvers',
    new: 'New approver',
  },
  assignApprovers: {
    header: 'Manage approvers in {{code}}',
    instructions: {
      check: "To assign an approver to this unit, select the user's check box.",
      uncheck: "To remove an approver, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
    hint:
      "Users displayed under the Approvers list are assigned approval privileges for the buyers of this unit and of child units. Note that a user who has the approver role is separate from an approver who appears under the Approvers list. If an approver doesn't exist for a unit, or if approvers do not have sufficient approval purchase privileges, an approver higher up the unit hierarchy is found, until an administration is chosen.",
  },

  breadcrumbs: {
    list: 'All units',
    details: '{{name}}',
    children: 'Child units',
    users: 'Users',
    approvers: 'Approvers',
    addresses: 'Shipping addresses',
    addressDetails: '{{formattedAddress}}',
    costCenters: 'Cost Centers',
  },
};

export const orgUnitChildren = {
  title: 'Child units',
  subtitle: 'Unit: {{item.name}}',
  info: {
    disabledCreate: 'Child unit can not be created for disabled unit.',
  },
  hint:
    'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. Users "inherit" child units, meaning buyers have access to cost centers and shipping addresses of child units when checking out.',
};

export const orgUnitAssignedRoles = {
  header: 'Manage roles in {{code}}',
  name: 'Name',
  email: 'Email',
  roles: 'Roles',
  roleCustomer: 'Customer',
  roleApprover: 'Approver',
  roleManager: 'Manager',
  roleAdministrator: 'Admin',
};

export const orgUnitApprovers = {
  title: 'Manage approvers',
  subtitle: 'Unit: {{item.name}}',
  assigned: 'User {{item.name}} assigned successfully',
  unassigned: 'User {{item.name}} unassigned successfully',
};

export const orgUnitAssignedApprovers = {
  title: 'Assigned approvers',
  subtitle: 'Unit: {{item.name}}',
  assigned: 'User {{item.name}} assigned successfully',
  unassigned: 'User {{item.name}} unassigned successfully',
  hint:
    "Users displayed under the Approvers list are assigned approval privileges for the buyers of this unit and of child units. Note that a user who has the approver role is separate from an approver who appears under the Approvers list. If an approver doesn't exist for a unit, or if approvers do not have sufficient approval purchase privileges, an approver higher up the unit hierarchy is found, until an administration is chosen.",
};

export const orgUnitAssignedUsers = {
  title: 'Assigned users',
  subtitle: 'Unit: {{item.name}}',
};

export const orgUnitUsers = {
  title: 'Assigned users',
  subtitle: 'Unit: {{item.name}}',
  info: {
    disabledCreate: 'User can not be created for disabled unit.',
  },
  hint:
    'Users are the buyers, approvers, managers, and administrators of your organization. Each user is assigned a role for making or approving purchases. Users "inherit" child units, meaning buyers have access to cost centers and shipping addresses of child units when checking out.',
};

export const orgUnitUserRoles = {
  title: 'User roles',
  subtitle: 'User: {{item.name}}',
  messages: {
    rolesUpdated: 'Roles successfully updated for {{item.name}}',
  },
};

export const orgUnitCostCenters = {
  title: 'Assigned cost centers',
  subtitle: 'Unit: {{item.name}}',
  info: {
    disabledCreate: 'Cost center can not be created for disabled unit.',
  },
  hint:
    'All orders placed through your organization\'s purchase account are linked to a cost center for tracking purposes. A buyer selects a cost center when checking out using the "Account" purchase method. Each unit can have multiple cost centers, but a single cost center can only be assigned to a single unit. To define ultimate spending limits, budgets are assigned to cost centers. ',
};

export const orgUnitAddress = {
  title: 'Shipping addresses',
  subtitle: 'Unit: {{item.name}}',

  country: 'Country/Region',
  titles: 'Title',
  firstName: 'First name',
  lastName: 'Last name',
  formattedAddress: 'Address',
  address1: 'Address',
  address2: '2nd address (optional)',
  city: 'City',
  state: 'State',
  zipCode: 'Zip code',
  phoneNumber: 'Phone number (optional)',
  streetAddress: 'Street Address',
  aptSuite: 'Apt, Suite',
  selectOne: 'Select One...',

  hint:
    'When a buyer is checking out using the "Account" purchase method, they much choose a cost center. The shipping addresses available to the buyer depend on the unit of the cost center chosen.',
  details: {
    title: 'Address details',
    subtitle: 'Unit: {{item.name}}',
  },
  edit: {
    title: 'Edit Address',
  },
  create: {
    title: 'Create Address',
  },
  form: {
    subtitle: 'Unit: {{item.name}}',
  },
  messages: {
    create:
      'Address {{ item.firstName }} {{ item.lastName }} created successfully',
    update:
      'Address {{ item.firstName }} {{ item.lastName }} updated successfully',
    delete:
      'The address cannot be brought back. Existing orders are not affected.',
    deleteTitle: 'Delete this address?',
    deleted:
      'Address {{ item.firstName }} {{ item.lastName }} deleted successfully',
  },
};
