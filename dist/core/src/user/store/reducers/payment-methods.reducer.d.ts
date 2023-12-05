import { PaymentDetails } from '../../../model/payment.model';
import { UserActions } from '../actions/index';
export declare const initialState: PaymentDetails[];
export declare function reducer(state: PaymentDetails[] | undefined, action: UserActions.UserPaymentMethodsAction): PaymentDetails[];
