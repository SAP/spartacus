import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { B2BUnitNode } from 'projects/core/src/model';

export const B2BUNIT_NORMALIZER = new InjectionToken<Converter<any, B2BUnitNode>>(
  'B2BUnitNormalizer'
);
