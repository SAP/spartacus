import { MemoizedSelector } from '@ngrx/store';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import { StateWithPickupOption } from '../pickup-option-state';
export declare const getPageContext: () => MemoizedSelector<StateWithPickupOption, string>;
export declare const getPickupOption: (entryNumber: number) => MemoizedSelector<StateWithPickupOption, PickupOption | undefined>;
