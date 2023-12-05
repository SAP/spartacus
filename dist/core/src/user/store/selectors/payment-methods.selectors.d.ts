import { MemoizedSelector } from '@ngrx/store';
import { PaymentDetails } from '../../../model/payment.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser } from '../user-state';
export declare const getPaymentMethodsState: MemoizedSelector<StateWithUser, LoaderState<PaymentDetails[]>>;
export declare const getPaymentMethods: MemoizedSelector<StateWithUser, PaymentDetails[]>;
export declare const getPaymentMethodsLoading: MemoizedSelector<StateWithUser, boolean>;
export declare const getPaymentMethodsLoadedSuccess: MemoizedSelector<StateWithUser, boolean>;
