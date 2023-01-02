/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MyCompanyConfig } from '../models/index';
import { loginAsMyCompanyAdmin } from '../my-company.utils';
import { testList, testListSorting } from './utils/list';

export function listTest(config: MyCompanyConfig): void {
  describe(`${config.name} List`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
    });

    it('should show and paginate list', () => {
      cy.visit(`/organization`);
      testList(config, {
        trigger: () =>
          cy.get(`cx-page-slot.BodyContent a`).contains(config.name).click(),
      });
    });

    testListSorting(config);
  });
}
