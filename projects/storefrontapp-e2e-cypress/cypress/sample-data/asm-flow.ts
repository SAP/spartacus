/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { generateMail, randomString } from '../helpers/user';

export const agentTOken = getAgentToken();

export function getAgentToken() {
  return {
    userName: 'asagent',
    pwd: 'pw4all',
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
