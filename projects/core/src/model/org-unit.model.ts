import { User } from './misc.model';

export interface B2BUnitNode {
  active?: boolean;
  children?: B2BUnitNode[];
  id?: string;
  name?: string;
  parent?: string;
}

export interface B2BUnit {
  active?: boolean;
  addresses?: OrgUnitAddress[];
  uid?: string;
  name?: string;
  parentOrgUnit?: string;
  approvalProcess?: B2BApprovalProcess;
  administrators?: B2BUser[];
  approvers?: B2BUser[];
  customers?: B2BUser[];
  managers?: B2BUser[];
}

export interface OrgUnitAddress {
  cellphone?: string;
  companyName?: string;
  country?: {
    isocode?: string;
    name?: string;
  };
  defaultAddress?: true;
  district?: string;
  email?: string;
  firstName?: string;
  formattedAddress?: string;
  id?: string;
  lastName?: string;
  line1?: string;
  line2?: string;
  phone?: string;
  postalCode?: string;
  region?: {
    countryIso?: string;
    isocode?: string;
    isocodeShort?: string;
    name?: string;
  };
  shippingAddress?: true;
  title?: string;
  titleCode?: string;
  town?: string;
  visibleInAddressBook?: true;
}

export interface B2BUser extends User {
  active?: boolean;
  approvers?: [];
}

export interface B2BApprovalProcess {
  code?: string;
  name?: string;
}
