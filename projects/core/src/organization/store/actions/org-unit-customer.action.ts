import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import {
  ORG_UNIT_CUSTOMER_ENTITIES,
  ORG_UNIT_CUSTOMER_LIST,
} from '../organization-state';
import { ListModel } from '../../../model/misc.model';
import { OrgUnitCustomer } from '@spartacus/core';

export const LOAD_ORG_UNIT_CUSTOMER =
  '[OrgUnitCustomer] Load OrgUnitCustomer Data';
export const LOAD_ORG_UNIT_CUSTOMER_FAIL =
  '[OrgUnitCustomer] Load OrgUnitCustomer Data Fail';
export const LOAD_ORG_UNIT_CUSTOMER_SUCCESS =
  '[OrgUnitCustomer] Load OrgUnitCustomer Data Success';

export const LOAD_ORG_UNIT_CUSTOMERS =
  '[OrgUnitCustomer] Load OrgUnitCustomers';
export const LOAD_ORG_UNIT_CUSTOMERS_FAIL =
  '[OrgUnitCustomer] Load OrgUnitCustomers Fail';
export const LOAD_ORG_UNIT_CUSTOMERS_SUCCESS =
  '[OrgUnitCustomer] Load OrgUnitCustomers Success';

export class LoadOrgUnitCustomer extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT_CUSTOMER;
  constructor(public payload: { userId: string; orgUnitCustomerId: string }) {
    super(ORG_UNIT_CUSTOMER_ENTITIES, payload.orgUnitCustomerId);
  }
}

export class LoadOrgUnitCustomerFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_CUSTOMER_FAIL;
  constructor(public payload: { orgUnitCustomerId: string; error: any }) {
    super(ORG_UNIT_CUSTOMER_ENTITIES, payload.orgUnitCustomerId, payload.error);
  }
}

export class LoadOrgUnitCustomerSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_CUSTOMER_SUCCESS;
  constructor(public payload: OrgUnitCustomer[]) {
    super(
      ORG_UNIT_CUSTOMER_ENTITIES,
      payload.map(orgUnitCustomer => orgUnitCustomer.uid)
    );
  }
}

export class LoadOrgUnitCustomers extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT_CUSTOMERS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(ORG_UNIT_CUSTOMER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadOrgUnitCustomersFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_CUSTOMERS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(
      ORG_UNIT_CUSTOMER_LIST,
      serializeB2BSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadOrgUnitCustomersSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_CUSTOMERS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(ORG_UNIT_CUSTOMER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export type OrgUnitCustomerAction =
  | LoadOrgUnitCustomer
  | LoadOrgUnitCustomerFail
  | LoadOrgUnitCustomerSuccess
  | LoadOrgUnitCustomers
  | LoadOrgUnitCustomersFail
  | LoadOrgUnitCustomersSuccess;
