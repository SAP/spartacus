export const accountSummary = {
  orgAccountSummary: {
    header: 'All account summary units ({{count}})',
    name: 'Name',
    details: {
      header: 'Account Summary Details',
      uid: 'ID',
      name: 'Name',
      address: 'Address',
      creditRep: 'Credit Rep',
      creditLine: 'Credit Line',
      currentBalance: 'Current Balance',
      openBalance: 'Open Balance',
      pastDueBalance: 'Past Due Balance',
    },
    document: {
      header: 'Documents',
      id: 'Document Number',
      type: 'Document Type',
      date: 'Created On',
      dueDate: 'Due On',
      originalAmount: 'Original Amount',
      openAmount: 'Open Amount',
      status: 'Status',
      attachment: 'Attachment'
    },
    //TODO
    hint: '',
  },

  breadcrumbs: {
    list: 'All account summary',
    details: '{{name}}',
  },
};
