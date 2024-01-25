/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from './address.model';
import { User } from './misc.model';

// TODO(#8876): Should we simplify the models only for the fields required by the B2B checkout?
export interface CostCenter {
  active?: boolean;
  code?: string;
  name?: string;
  unit?: B2BUnit;
}

export enum B2BUserRole {
  ADMIN = 'b2badmingroup',
  CUSTOMER = 'b2bcustomergroup',
  MANAGER = 'b2bmanagergroup',
  APPROVER = 'b2bapprovergroup',
}

export enum B2BUserRight {
  UNITORDERVIEWER = 'unitorderviewergroup',
}

export interface B2BUnit {
  active?: boolean;
  addresses?: Address[];
  uid?: string;
  name?: string;
}

export interface B2BUser extends User {
  active?: boolean;
  email?: string;
}

export interface B2BApprovalProcess {
  code?: string;
  name?: string;
}

export interface OrderApprovalPermissionType {
  code?: string;
  name?: string;
}
