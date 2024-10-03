/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AccountData,
  RegistrationData,
} from '../support/require-logged-in.commands';
import { SampleProduct } from './checkout-flow';

export const registration: RegistrationData = {
  firstName: '',
  lastName: '',
  password: 'pw4all',
  titleCode: 'mr',
  email: '',
};

export const b2bUnitOrderViewerManager = {
  name: 'Hanna Schmidt',
  uid: 'hanna.schmidt@rustic-hw.com',
};

export const b2bUnitOrderViewer = {
  name: 'Gi Sun',
  uid: 'gi.sun@rustic-hw.com',
};

export const b2bUnitOrderViewer2 = {
  name: 'Mark Rivers',
  uid: 'mark.rivers@rustic-hw.com',
};
export const b2bCommonUser = {
  name: 'William Hunter',
  uid: 'william.hunter@rustic-hw.com',
};

export const b2bCommonUserAccount: AccountData = {
  registrationData: { ...registration, email: b2bCommonUser.uid },
  user: '',
};

export const b2bUnitOrderViewerAccount: AccountData = {
  registrationData: { ...registration, email: b2bUnitOrderViewer.uid },
  user: '',
};

export const b2bUnitOrderViewerAccount2: AccountData = {
  registrationData: { ...registration, email: b2bUnitOrderViewer2.uid },
  user: '',
};

export const b2bUnitOrderViewerManagerAccount: AccountData = {
  registrationData: { ...registration, email: b2bUnitOrderViewerManager.uid },
  user: '',
};

export const product1: SampleProduct = {
  code: '4567192',
  name: 'GSR 12 V',
};

export const product2: SampleProduct = {
  code: '3887124',
  name: 'G13SR3',
};

export const product3: SampleProduct = {
  code: '5888798',
  name: 'HGTK01-SB',
};
