import { InjectionToken } from '@angular/core';
import { Converter, ConsentTemplate } from '@spartacus/core';

export const CDC_USER_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<ConsentTemplate, any>
>('CdcUserPreferenceSerializer');
