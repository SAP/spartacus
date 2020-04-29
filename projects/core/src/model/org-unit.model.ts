import { User } from './misc.model';
import { CostCenter } from './cost-center.model';

export interface B2BUnitNode {
  active?: boolean;
  children?: B2BUnitNode[];
  id?: string;
  name?: string;
  parent?: string;
}

export interface B2BUnit {
  active?: boolean;
  addresses?: B2BAddress[];
  uid?: string;
  name?: string;
  parentOrgUnit?: Partial<B2BUnit>;
  approvalProcess?: B2BApprovalProcess;
  administrators?: B2BUser[];
  approvers?: B2BUser[];
  customers?: B2BUser[];
  costCenters?: CostCenter[];
  managers?: B2BUser[];
}

export interface B2BAddress {
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
  orgUnit?: B2BUnit;
  roles?: string[];
  selected?: boolean;
}

export interface B2BApprovalProcess {
  code?: string;
  name?: string;
}
