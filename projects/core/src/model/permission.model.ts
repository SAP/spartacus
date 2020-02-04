<<<<<<< HEAD
import { Currency, User } from './misc.model';
// import { B2BUnitNode } from './org-unit.model';
import { OrgUnitAddress } from './budget.model';

export interface B2BUser extends User {
  active?: boolean;
  approvers?: [];
}

// export interface OrgUnitAddress {
//   cellphone?: string;
//   companyName?: string;
//   country?: {
//     isocode?: string;
//     name?: string;
//   };
//   defaultAddress?: true;
//   district?: string;
//   email?: string;
//   firstName?: string;
//   formattedAddress?: string;
//   id?: string;
//   lastName?: string;
//   line1?: string;
//   line2?: string;
//   phone?: string;
//   postalCode?: string;
//   region?: {
//     countryIso?: string;
//     isocode?: string;
//     isocodeShort?: string;
//     name?: string;
//   };
//   shippingAddress?: true;
//   title?: string;
//   titleCode?: string;
//   town?: string;
//   visibleInAddressBook?: true;
// }

// export interface B2BUnitNode {
//   active?: boolean;
//   children?: Array<B2BUnitNode>;
//   id?: string;
//   name?: string;
//   parent?: string;
// }

export interface B2BApprovalProcess {
  code?: string;
  name?: string;
}

export interface B2BUnit {
  active?: boolean;
  addresses?: Array<OrgUnitAddress>;
  uid?: string;
  name?: string;
  parentOrgUnit?: string;
  approvalProcess?: B2BApprovalProcess;
  administrators?: B2BUser[];
  approvers?: B2BUser[];
  customers?: B2BUser[];
  managers?: B2BUser[];
}
=======
import { Currency } from './misc.model';
import { B2BUnit } from './org-unit.model';

>>>>>>> 8902e5cfed8bb22e0b4b53d5f2c043a26d1e184d
export interface OrderApprovalPermissionType {
  code: string;
  name?: string;
}

export enum Period {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
}

export interface Permission {
  active?: boolean;
  code: string;
  currency?: Currency;
  orderApprovalPermissionType?: OrderApprovalPermissionType;
  orgUnit?: B2BUnit;
  periodRange?: Period;
  selected?: boolean;
  threshold?: number;
}
