/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const POWERTOOLS_BASESITE = 'powertools-spa';

export const rusticUnitId = 'Custom Retail';
export const documentNumberRangeStart = 'POCR-0000001';
export const documentNumberRangeEnd = 'POCR-0000005';
export const sortByDocumentNumberDescending = 'Document Number Descending';
export const statusAll = 'All';

export const notAuthorizedText =
  'No sufficient permissions to access this page';

export const headerDetailTiles = [
  { title: 'Unit ID', value: 'Custom Retail' },
  { title: 'Unit Name', value: 'Custom Retail' },
  { title: 'Address', value: 'Ms, Carla Torres' },
  { title: 'Credit Rep', value: 'n/a' },
  { title: 'Credit Line', value: 'n/a' },
  { title: 'Current Balance', value: '$102,145,214.00' },
  { title: 'Open Balance', value: '$135,737,232.00' },
];

export const documentsDefault = [
  {
    documentNumber: 'CRNCR-0000001',
    documentType: 'Invoice',
    createdOn: 'March 10, 2022',
    dueOn: 'April 9, 2022',
    originalAmount: '$796,371.00',
    openAmount: '$796,371.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000001',
    documentType: 'Purchase Order',
    createdOn: 'March 10, 2022',
    originalAmount: '$7,851,558.00',
    openAmount: '$7,851,558.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000002',
    documentType: 'Purchase Order',
    createdOn: 'March 10, 2022',
    originalAmount: '$5,094,536.00',
    openAmount: '$5,094,536.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000003',
    documentType: 'Purchase Order',
    createdOn: 'March 10, 2022',
    originalAmount: '$8,200,511.00',
    openAmount: '$8,200,511.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000004',
    documentType: 'Purchase Order',
    createdOn: 'March 10, 2022',
    originalAmount: '$3,175,103.00',
    openAmount: '$3,175,103.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000009',
    documentType: 'Purchase Order',
    createdOn: 'March 18, 2022',
    originalAmount: '$3,754,263.00',
    openAmount: '$3,754,263.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000010',
    documentType: 'Purchase Order',
    createdOn: 'March 18, 2022',
    originalAmount: '$3,893,837.00',
    openAmount: '$3,893,837.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000011',
    documentType: 'Purchase Order',
    createdOn: 'March 18, 2022',
    originalAmount: '$2,537,717.00',
    openAmount: '$2,537,717.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000012',
    documentType: 'Purchase Order',
    createdOn: 'March 18, 2022',
    originalAmount: '$7,745,197.00',
    openAmount: '$7,745,197.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000013',
    documentType: 'Purchase Order',
    createdOn: 'March 18, 2022',
    originalAmount: '$7,624,105.00',
    openAmount: '$7,624,105.00',
    status: 'Open',
  },
];

export const documentsFilteredOpen = [
  { documentNumber: 'POCR-0000004', status: 'Open' },
  { documentNumber: 'POCR-0000003', status: 'Open' },
  { documentNumber: 'POCR-0000002', status: 'Open' },
  { documentNumber: 'POCR-0000001', status: 'Open' },
];

export const documentsFilteredAll = [
  { documentNumber: 'POCR-0000005', status: 'Closed' },
  { documentNumber: 'POCR-0000004', status: 'Open' },
  { documentNumber: 'POCR-0000003', status: 'Open' },
  { documentNumber: 'POCR-0000002', status: 'Open' },
  { documentNumber: 'POCR-0000001', status: 'Open' },
];
