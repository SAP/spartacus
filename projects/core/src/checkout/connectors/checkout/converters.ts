/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { PointOfService } from '../../../model/point-of-service.model';
import { Converter } from '../../../util/converter.service';

export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');
