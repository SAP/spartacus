import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_REPLENISHMENT_ORDERS } from '../user-state';
import { UserActions } from './index';

const mockUserReplenishmentOrder: {
    userId: string;
    pageSize: number;
    currentPage: number;
    sort: string;
} = {
    userId: 'test@sap.com',
    pageSize: 5,
    currentPage: 1,
    sort: 'byDate',
};

const mockUserReplenishmentOrders: ReplenishmentOrderList = {
    replenishmentOrders: [{ code: '01' }, { code: '02' }],
    pagination: {
        totalPages: 13,
    },
    sorts: [{ selected: true }, { selected: false }],
};

describe('User Replenishment Orders Actions', () => {
    describe('LoadUserReplenishmentOrders Actions', () => {
        it('should create the action', () => {
            const action = new UserActions.LoadUserReplenishmentOrders(mockUserReplenishmentOrder);

            expect({ ...action }).toEqual({
                type: UserActions.LOAD_USER_REPLENISHMENT_ORDERS,
                payload: mockUserReplenishmentOrder,
                meta: StateUtils.loadMeta(USER_REPLENISHMENT_ORDERS),
            });
        });
    });

    describe('LoadUserReplenishmentOrdersFail Action', () => {
        it('should create the action', () => {
            const error = 'mockError';
            const action = new UserActions.LoadUserReplenishmentOrdersFail(error);

            expect({ ...action }).toEqual({
                type: UserActions.LOAD_USER_REPLENISHMENT_ORDERS_FAIL,
                payload: error,
                meta: StateUtils.failMeta(USER_REPLENISHMENT_ORDERS, error),
            });
        });
    });

    describe('LoadUserReplenishmentOrdersSuccess Action', () => {
        it('should create the action', () => {
            const action = new UserActions.LoadUserReplenishmentOrdersSuccess(mockUserReplenishmentOrders);

            expect({ ...action }).toEqual({
                type: UserActions.LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS,
                payload: mockUserReplenishmentOrders,
                meta: StateUtils.successMeta(USER_REPLENISHMENT_ORDERS),
            });
        });
    });

    describe('ClearUserReplenishmentOrders Action', () => {
        it('should create the action', () => {
            const action = new UserActions.ClearUserReplenishmentOrders();

            expect({ ...action }).toEqual({
                type: UserActions.CLEAR_USER_REPLENISHMENT_ORDERS,
                meta: StateUtils.resetMeta(USER_REPLENISHMENT_ORDERS),
            });
        });
    });
});

