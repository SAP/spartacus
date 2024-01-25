/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const POWERTOOLS_BASESITE = 'powertools-spa';

export const rusticUnitId = 'Custom Retail';
export const prontoUnitId = 'Pronto Goods';
export const documentNumberRangeStart = 'POPG-0000001';
export const documentNumberRangeEnd = 'POPG-0000005';
export const sortByDocumentNumberDescending = 'Document Number Descending';
export const statusAll = 'All';

export const notAuthorizedText =
  'No sufficient permissions to access this page';

export const headerDetailTilesRustic = [
  { title: 'Unit ID', value: 'Custom Retail' },
  { title: 'Unit Name', value: 'Custom Retail' },
  { title: 'Address', value: 'Ms., Carla Torres' },
  { title: 'Credit Rep', value: 'n/a' },
  { title: 'Credit Line', value: 'n/a' },
  { title: 'Current Balance', value: '$102,145,214.00' },
  { title: 'Open Balance', value: '$135,737,232.00' },
];

export const headerDetailTilesPronto = [
  { title: 'Unit ID', value: 'Pronto Goods' },
  { title: 'Unit Name', value: 'Pronto Goods' },
  { title: 'Address', value: 'Mr., Gi Sun' },
  { title: 'Credit Rep', value: 'n/a' },
  { title: 'Credit Line', value: 'n/a' },
  { title: 'Current Balance', value: '$107,001,449.00' },
  { title: 'Open Balance', value: '$190,172,984.00' },
];

// The dates have been omitted from the value checks because they are generated dynmically and will change from one run to the next.

export const documentsInitial = [
  {
    documentNumber: 'STAPG-00010000',
    documentType: 'Statement',
    originalAmount: '$681,547.00',
    openAmount: '$681,547.00',
    status: 'Open',
  },
  {
    documentNumber: 'STAPG-00000002',
    documentType: 'Statement',
    originalAmount: '$184,450,160.00',
    openAmount: '$184,450,160.00',
    status: 'Open',
  },
  {
    documentNumber: 'STAPG-00000001',
    documentType: 'Statement',
    originalAmount: '$437,948.00',
    openAmount: '$437,948.00',
    status: 'Open',
  },
  {
    documentNumber: 'POPG-00100006',
    documentType: 'Purchase Order',
    originalAmount: '$30,599.00',
    openAmount: '$30,599.00',
    status: 'Open',
  },
  {
    documentNumber: 'POPG-00006020',
    documentType: 'Purchase Order',
    originalAmount: '$236,321.00',
    openAmount: '$236,321.00',
    status: 'Open',
  },
  {
    documentNumber: 'POPG-00006017',
    documentType: 'Purchase Order',
    originalAmount: '$5,249.00',
    openAmount: '$5,249.00',
    status: 'Open',
  },
  {
    documentNumber: 'POPG-00006015',
    documentType: 'Purchase Order',
    originalAmount: '$60,538.00',
    openAmount: '$60,538.00',
    status: 'Open',
  },
  {
    documentNumber: 'POPG-00006012',
    documentType: 'Purchase Order',
    originalAmount: '$21,799.00',
    openAmount: '$21,799.00',
    status: 'Open',
  },
  {
    documentNumber: 'POPG-00006009',
    documentType: 'Purchase Order',
    originalAmount: '$17,199.00',
    openAmount: '$17,199.00',
    status: 'Open',
  },
  {
    documentNumber: 'POPG-0000048',
    documentType: 'Purchase Order',
    originalAmount: '$5,754,837.00',
    openAmount: '$5,754,837.00',
    status: 'Open',
  },
];

export const documentsFilteredOpen = [
  { documentNumber: 'POPG-0000004', status: 'Open' },
  { documentNumber: 'POPG-0000003', status: 'Open' },
  { documentNumber: 'POPG-0000002', status: 'Open' },
  { documentNumber: 'POPG-0000001', status: 'Open' },
];

export const documentsFilteredAll = [
  { documentNumber: 'POPG-0000005', status: 'Closed' },
  { documentNumber: 'POPG-0000004', status: 'Open' },
  { documentNumber: 'POPG-0000003', status: 'Open' },
  { documentNumber: 'POPG-0000002', status: 'Open' },
  { documentNumber: 'POPG-0000001', status: 'Open' },
];
