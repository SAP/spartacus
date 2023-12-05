import { UserActions } from '../actions/index';
import { RegionsState } from '../user-state';
export declare const initialState: RegionsState;
export declare function reducer(state: RegionsState | undefined, action: UserActions.RegionsAction | UserActions.ClearUserMiscsData): RegionsState;
