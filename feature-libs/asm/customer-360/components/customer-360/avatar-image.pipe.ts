/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { CustomerOverview } from '@spartacus/asm/customer-360/root';
import { Image } from '@spartacus/core';

@Pipe({ name: 'cxAvatarImage' })
export class AvatarImagePipe implements PipeTransform {
  transform(overview?: CustomerOverview): Image | undefined {
    return overview?.userAvatar?.url
      ? {
          altText: overview.name,
          url: overview.userAvatar.url,
          format: overview.userAvatar.format,
        }
      : undefined;
  }
}
