export const organization = {
  budgetsList: {
    assign: 'Assign',
    code: 'Code',
    name: 'Name',
    amount: 'Amount',
    startEndDate: 'Start - End',
    costCenter: 'Cost center',
    parentUnit: 'Parent Unit',
    sortByMostRecent: 'sortByMostRecent',
    noBudgets: 'No budgets',
    budgetManagement: 'Budget Management',
    searchBox: 'Find budget',
    create: 'Create new budget',
    sorting: {
      byUnitName: 'Unit Name',
      byName: 'Name',
      byCode: 'Code',
      byValue: 'Value',
    },
  },
  budget: {
    details: 'Budget details',
    id: 'ID',
    name: 'Budget Name',
    amount: 'Amount',
    currency: 'Currency',
    startDate: 'Start date',
    endDate: 'End date',
    parentUnit: 'Parent Unit',
    sortByMostRecent: 'sortByMostRecent',
    noBudgets: 'No budgets',
    edit: 'Edit',
    disable: 'Disable',
    enable: 'Enable',
    status: 'Status',
    back: 'Back to list',
    active: 'Active',
    deactivated: 'Deactivated',
    costCenters: 'Cost Centers',
    costCenter: {
      code: 'Code',
      name: 'Name',
    },
  },
  budgetForm: {
    create: 'Create Budget',
    edit: 'Edit Budget',
    update: 'Update Budget',
    code: {
      label: 'Budget ID',
      placeholder: 'Code',
    },
    name: {
      label: 'Budget name',
      placeholder: 'Name',
    },
    businessUnits: {
      label: 'Parent business unit',
      placeholder: 'Select business unit',
    },
    startDate: 'Start date',
    endDate: 'End date',
    currency: 'Currency',
    amount: {
      label: 'Budget amount',
      placeholder: 'Amount',
    },
    message: {
      required: 'Value is required',
      rangeOverflow: 'Date must be before {{date}}',
      rangeUnderflow: 'Date must be after {{date}}',
    },
  },
  permissionsList: {
    code: 'Code',
    permissionManagement: 'Persmission Management',
    threshold: 'Threshold Value',
    type: 'Type',
    timePeriod: 'Time Period',
    parentUnit: 'Parent Unit',
    sortByMostRecent: 'sortByMostRecent',
    sorting: {
      byUnitName: 'Unit Name',
      byName: 'Name',
      byCode: 'Code',
      byValue: 'Value',
    },
    create: 'Create new Permission',
  },
  permission: {
    details: 'Permission details',
    id: 'ID',
    name: 'Permission Name',
    currency: 'Currency',
    parentUnit: 'Parent Unit',
    edit: 'Edit',
    disable: 'Disable',
    enable: 'Enable',
    status: 'Status',
    back: 'Back to list',
    active: 'Active',
    deactivated: 'Deactivated',
    threshold: 'Threshold Amount',
  },
  permissionForm: {
    create: 'Create Permission',
    edit: 'Edit Permission',
    update: 'Update Permission',
    code: {
      label: 'Permission ID',
      placeholder: 'Code',
    },
    businessUnits: {
      label: 'Parent business unit',
      placeholder: 'Select business unit',
    },
    periodRange: 'Period range',
    type: 'Type',
    currency: 'Currency',
    threshold: {
      label: 'Permission threshold',
      placeholder: 'Amount',
    },
    message: {
      required: 'Value is required',
    },
  },
  costCentersList: {
    code: 'Code',
    costCenterManagement: 'Cost Center Management',
    name: 'Name',
    currency: 'Currency',
    parentUnit: 'Parent Unit',
    sortByMostRecent: 'sortByMostRecent',
    sorting: {
      byUnitName: 'Unit Name',
      byName: 'Name',
      byCode: 'Code',
    },
    create: 'Create new Cost Center',
  },
  costCenter: {
    code: 'Code',
    details: 'Cost Center Details',
    name: 'Name',
    currency: 'Currency',
    parentUnit: 'Parent Unit',
    edit: 'Edit',
    disable: 'Disable',
    enable: 'Enable',
    status: 'Status',
    back: 'Back to list',
    active: 'Active',
    deactivated: 'Deactivated',
    budgets: 'Budgets',
    assignBudgets: 'Manage Budgets',
  },
  costCenterAssignBudgets: {
    header: 'Manage budgets in {{code}}',
    back: 'Close',
  },
  costCenterForm: {
    create: 'Create Cost Center',
    edit: 'Edit Cost Center',
    update: 'Update Cost Center',
    code: {
      label: 'Cost Center ID',
      placeholder: 'Code',
    },
    name: {
      label: 'Cost Center name',
      placeholder: 'Name',
    },
    businessUnits: {
      label: 'Parent business unit',
      placeholder: 'Select business unit',
    },
    currency: 'Currency',
    message: {
      required: 'Value is required',
    },
  },
  orgUnitsList: {
    orgUnitManagement: 'Organization Units Management',
    create: 'Create new Unit',
  },
  orgUnit: {
    details: 'Unit Details',
    uid: 'ID',
    name: 'Name',
    approvalProcess: 'Approval process',
    parentUnit: 'Parent Unit',
    edit: 'Edit',
    disable: 'Disable',
    enable: 'Enable',
    status: 'Status',
    back: 'Back to list',
    active: 'Active',
    deactivated: 'Deactivated',
    assignRoles: 'Manage Roles',
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
    message: {
      required: 'Value is required',
    },
  },
  unitAssignRoles: {
    header: 'Manage roles in {{code}}',
    back: 'Close',
  },
  userList: {
    sorting: {
      byName: 'Name',
    },
    uid: 'Email',
    name: 'Name',
    roles: 'Roles',
    assign: 'Assign',
    parentUnit: 'Unit',
    admin: 'Administrator',
    manager: 'Manager',
    approver: 'Approver',
    customer: 'Customer',
  },
  userGroupsList: {
    assign: 'Assign',
    id: 'ID',
    name: 'Name',
    noOfUsers: 'No. of Users',
    parentUnit: 'Parent Unit',
    noUserGroups: 'No user groups',
    userGroupManagement: 'User Group Management',
    searchBox: 'Find user group',
    create: 'Create new user group',
    sorting: {
      byUnitName: 'Unit Name',
      byName: 'Name',
      byGroupID: 'Group ID',
    },
  },
  userGroup: {
    details: 'User Group details',
    id: 'ID',
    name: 'User Group Name',
    parentUnit: 'Parent Unit',
    edit: 'Edit',
    back: 'Back to list',
  },
  userGroupForm: {
    create: 'Create User Group',
    edit: 'Edit User Group',
    update: 'Update User Group',
    code: {
      label: 'User Group ID',
      placeholder: 'Code',
    },
    name: {
      label: 'User Group name',
      placeholder: 'Name',
    },
    businessUnits: {
      label: 'Parent business unit',
      placeholder: 'Select business unit',
    },
    message: {
      required: 'Value is required',
    },
  },
};
