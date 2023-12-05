import { MemoizedSelector } from '@ngrx/store';
import { StateWithUser, UserState } from '../user-state';
export declare const getUserState: MemoizedSelector<StateWithUser, UserState>;
