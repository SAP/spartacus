/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const s1 = {
  id: '00000001',
  name: 'Mobile Plan 2020',
  productCode: 'Mobile_2020_Plan_cpq',
  startDate: '2025-04-09T09:33:40+0000',
  endDate: '2026-04-09T09:33:40+0000',
  subscriptionStatus: 'Active',
};
export const s2 = {
  id: '00000002',
  name: 'Mobile Plan 2021',
  productCode: 'Mobile_2020_Plan_cpq',
  startDate: '2026-04-09T09:33:40+0000',
  endDate: '2027-04-09T09:33:40+0000',
  subscriptionStatus: 'Cancelled',
};
export const s3 = {
  id: '00000003',
  name: 'Mobile Plan 2022',
  productCode: 'Mobile_2020_Plan_cpq',
  startDate: '2027-04-09T09:33:40+0000',
  endDate: '2028-04-09T09:33:40+0000',
  subscriptionStatus: 'Cancelled',
};
export const s4 = {
  id: '00000004',
  name: 'Mobile Plan 2023',
  productCode: 'Mobile_2020_Plan_cpq',
  startDate: '2021-04-09T09:33:40+0000',
  endDate: '2022-04-09T09:33:40+0000',
  subscriptionStatus: 'Active',
};
export const s5 = {
  id: '00000005',
  name: 'Mobile Plan 2024',
  productCode: 'Mobile_2020_Plan_cpq',
  startDate: '2015-04-09T09:33:40+0000',
  endDate: '2017-04-09T09:33:40+0000',
  subscriptionStatus: 'Active',
};

export const mock_list = {
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byId',
    totalPages: 2,
    totalResults: 6,
  },
  sorts: [
    {
      code: 'byId',
      selected: true,
    },
  ],
  subscriptions: [s1, s2, s3, s4, s5],
};
