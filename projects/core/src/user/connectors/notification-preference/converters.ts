/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { Converter } from '../../../util/converter.service';

export const NOTIFICATION_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<NotificationPreference[], any>
>('NotificationPreferenceSerializer');

export const NOTIFICATION_PREFERENCE_NORMALIZER = new InjectionToken<
  Converter<any, NotificationPreference>
>('NotificationPreferenceNormalizer');
