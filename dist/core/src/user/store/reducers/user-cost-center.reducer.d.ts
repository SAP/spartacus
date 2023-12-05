import { CostCenter } from '../../../model/org-unit.model';
import { UserActions } from '../actions/index';
export declare const initialState: CostCenter[];
export declare function reducer(state: CostCenter[] | undefined, action: UserActions.UserCostCenterAction): CostCenter[];
