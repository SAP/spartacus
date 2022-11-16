/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const POWERTOOLS_BASESITE = 'powertools-spa';

export const rusticUnitId = 'Custom Retail';
export const prontoUnitId = 'Pronto Goods';
export const documentNumberRangeStart = 'POCR-0000001';
export const documentNumberRangeEnd = 'POCR-0000005';
export const sortByDocumentNumberDescending = 'Document Number Descending';
export const statusAll = 'All';

export const notAuthorizedText =
  'No sufficient permissions to access this page';

export const headerDetailTiles = [
  { title: 'Unit ID', value: 'Custom Retail' },
  { title: 'Unit Name', value: 'Custom Retail' },
  { title: 'Address', value: 'Ms., Carla Torres' },
  { title: 'Credit Rep', value: 'n/a' },
  { title: 'Credit Line', value: 'n/a' },
  { title: 'Current Balance', value: '$102,145,214.00' },
  { title: 'Open Balance', value: '$135,737,232.00' },
];

// The dates have been omitted from the value checks because they are generated dynmically and will change from one run to the next.

export const documentsInitial = [
  {
    documentNumber: 'STACR-00000002',
    documentType: 'Statement',
    originalAmount: '$129,414,653.00',
    openAmount: '$129,414,653.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000035',
    documentType: 'Purchase Order',
    originalAmount: '$4,435,440.00',
    openAmount: '$4,435,440.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000034',
    documentType: 'Purchase Order',
    originalAmount: '$2,118,807.00',
    openAmount: '$2,118,807.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000033',
    documentType: 'Purchase Order',
    originalAmount: '$6,066,678.00',
    openAmount: '$6,066,678.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000032',
    documentType: 'Purchase Order',
    originalAmount: '$7,881,087.00',
    openAmount: '$7,881,087.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000031',
    documentType: 'Purchase Order',
    originalAmount: '$4,707,533.00',
    openAmount: '$4,707,533.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000030',
    documentType: 'Purchase Order',
    originalAmount: '$5,035,624.00',
    openAmount: '$5,035,624.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000024',
    documentType: 'Purchase Order',
    originalAmount: '$8,027,799.00',
    openAmount: '$8,027,799.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000023',
    documentType: 'Purchase Order',
    originalAmount: '$3,409,059.00',
    openAmount: '$3,409,059.00',
    status: 'Open',
  },
  {
    documentNumber: 'POCR-0000022',
    documentType: 'Purchase Order',
    originalAmount: '$71,760.00',
    openAmount: '$71,760.00',
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
