import { ConsentTemplate } from '../../../model/consent.model';
import { UserActions } from '../actions/index';
export declare const initialState: ConsentTemplate[];
export declare function reducer(state: ConsentTemplate[] | undefined, action: UserActions.UserConsentsAction): ConsentTemplate[];
