/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@spartacus/core';

@Pipe({ name: 'avatarLabel' })
export class AvatarLabelPipe implements PipeTransform {
  transform(customer?: User): string {
    customer = customer ?? {};
    const { firstName = '', lastName = '' } = customer;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }
}
