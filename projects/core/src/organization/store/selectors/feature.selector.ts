import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  ORGANIZATION_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';

export const getOrganizationState: MemoizedSelector<
  StateWithOrganization,
  OrganizationState
> = createFeatureSelector<OrganizationState>(ORGANIZATION_FEATURE);
