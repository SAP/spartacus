import { PointOfServiceStock } from '@spartacus/core';
import { PickRequiredDeep } from '../utils';

export type PointOfServiceNames = PickRequiredDeep<
  PointOfServiceStock,
  'name' | 'displayName'
>;
