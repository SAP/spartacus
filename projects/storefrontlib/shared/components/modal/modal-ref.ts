// SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**
 * A reference to a newly opened modal
 *
 * @todo remove ngb dependency and create our own implementation of ModalRef
 */
export class ModalRef extends NgbModalRef {}
