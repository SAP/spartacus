import { Occ } from '../occ/occ-models/occ.models';

export interface Budget {
  active: boolean;
  budget: number;
  code: string;
  currency: Occ.Currency;
  endDate: string;
  startDate: string;
  name: string;
  orgUnit: OrgUnit;
  costCenters?: CostCenter[];
}

export interface OrgUnit {
  uid: string;
  name: string;
}

export interface CostCenter {
  active: string;
  code: string;
  name: string;
  until: {};
}
