export const accountSummary = {
  orgAccountSummary: {
    header: 'All account summary units ({{count}})',
    name: 'Name',
    details: {
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
      id: 'Document #',
      type: 'Document Type',
      date: 'Document Date',
      dueDate: 'Due Date',
      originalAmount: 'Original Amount',
      openAmount: 'Open Amount',
      status: 'Status',
      attachment: 'Attachment',
    },
    //TODO
    hint: '',
  },

  breadcrumbs: {
    list: 'All account summary',
    details: '{{name}}',
  },
};
