/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { generateMail, randomString } from '../helpers/user';

export function getB2CAgent() {
  return {
    userName: 'asagent',
    password: 'pw4all',
  };
}

export function getB2BAgent() {
  return {
    userName: 'brandon.leclair@acme.com',
    password: 'pw4all',
  };
}

export function getB2BAgent2() {
  return {
    userName: 'jules.hasson@acme.com',
    password: 'pw4all',
  };
}

export const b2cUser = getASMB2CCustomer();

export function getASMB2CCustomer() {
  return {
    firstName: 'aaron',
    lastName: 'customer',
    fullName: 'Aaron Customer',
    password: 'pw4all',
    email: 'aaron.customer@hybris.com',
  };
}

export const b2cUser2 = getASMB2CCustomer2();

export function getASMB2CCustomer2() {
  return {
    firstName: 'andrew',
    lastName: 'customer',
    fullName: 'Andrew Customer',
    password: 'pw4all',
    email: 'andrew.customer@hybris.com',
  };
}

export function getASMB2BCustomer() {
  return {
    firstName: 'William',
    lastName: 'Hunter',
    fullName: 'William Hunter',
    password: 'pw4all',
    email: 'william.hunter@pronto-hw.com',
  };
}

export function getASMB2BCustomer2() {
  return {
    firstName: 'Gi',
    lastName: 'Sun',
    fullName: 'Gi Sun',
    password: 'pw4all',
    email: 'gi.sun@pronto-hw.com',
  };
}

export const productCode = getProductCode();

export function getProductCode() {
  return '479742';
}

export const ticketDetails = getTicketDetails();

export function getTicketDetails() {
  return {
    subject: 'Testing' + randomString(),
    message: 'I am testing asm deep linking.',
    ticketCategory: {
      id: 'ENQUIRY',
      name: 'Complaint',
    },
  };
}
