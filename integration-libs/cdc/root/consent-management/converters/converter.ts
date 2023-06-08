import { InjectionToken } from '@angular/core';
import { Converter, ConsentTemplate } from '@spartacus/core';

//maintaining target as any because 'preferences' in cdc can have any structure
export const CDC_USER_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<ConsentTemplate, any>
>('CdcUserPreferenceSerializer');
