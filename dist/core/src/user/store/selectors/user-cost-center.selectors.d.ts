import { MemoizedSelector } from '@ngrx/store';
import { CostCenter } from '../../../model/org-unit.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser } from '../user-state';
export declare const getCostCentersState: MemoizedSelector<StateWithUser, LoaderState<CostCenter[]>>;
export declare const getCostCenters: MemoizedSelector<StateWithUser, CostCenter[]>;
