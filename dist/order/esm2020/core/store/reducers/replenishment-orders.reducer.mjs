/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { OrderActions } from '../actions/index';
export const initialState = {
    replenishmentOrders: [],
    pagination: {},
    sorts: [],
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case OrderActions.LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS: {
            return action.payload ? action.payload : initialState;
        }
        case OrderActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
            const cancelledReplenishmentOrder = action.payload;
            const userReplenishmentOrders = [...(state.replenishmentOrders ?? [])];
            const index = userReplenishmentOrders.findIndex((replenishmentOrder) => replenishmentOrder.replenishmentOrderCode ===
                cancelledReplenishmentOrder.replenishmentOrderCode);
            if (index === -1) {
                return initialState;
            }
            else {
                userReplenishmentOrders[index] = {
                    ...cancelledReplenishmentOrder,
                };
            }
            return { ...state, replenishmentOrders: userReplenishmentOrders };
        }
    }
    return state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlcnMucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb3JlL3N0b3JlL3JlZHVjZXJzL3JlcGxlbmlzaG1lbnQtb3JkZXJzLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQU1ILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQTJCO0lBQ2xELG1CQUFtQixFQUFFLEVBQUU7SUFDdkIsVUFBVSxFQUFFLEVBQUU7SUFDZCxLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFFRixNQUFNLFVBQVUsT0FBTyxDQUNyQixLQUFLLEdBQUcsWUFBWSxFQUNwQixNQUVnRDtJQUVoRCxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxZQUFZLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUN4RCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztTQUN2RDtRQUVELEtBQUssWUFBWSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDcEQsTUFBTSwyQkFBMkIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ25ELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdkUsTUFBTSxLQUFLLEdBQUcsdUJBQXVCLENBQUMsU0FBUyxDQUM3QyxDQUFDLGtCQUFzQyxFQUFFLEVBQUUsQ0FDekMsa0JBQWtCLENBQUMsc0JBQXNCO2dCQUN6QywyQkFBMkIsQ0FBQyxzQkFBc0IsQ0FDckQsQ0FBQztZQUVGLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNoQixPQUFPLFlBQVksQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsR0FBRztvQkFDL0IsR0FBRywyQkFBMkI7aUJBQy9CLENBQUM7YUFDSDtZQUVELE9BQU8sRUFBRSxHQUFHLEtBQUssRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxDQUFDO1NBQ25FO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBSZXBsZW5pc2htZW50T3JkZXIsXG4gIFJlcGxlbmlzaG1lbnRPcmRlckxpc3QsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPcmRlckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogUmVwbGVuaXNobWVudE9yZGVyTGlzdCA9IHtcbiAgcmVwbGVuaXNobWVudE9yZGVyczogW10sXG4gIHBhZ2luYXRpb246IHt9LFxuICBzb3J0czogW10sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUsXG4gIGFjdGlvbjpcbiAgICB8IE9yZGVyQWN0aW9ucy5Vc2VyUmVwbGVuaXNobWVudE9yZGVyc0FjdGlvblxuICAgIHwgT3JkZXJBY3Rpb25zLlJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNBY3Rpb25cbik6IFJlcGxlbmlzaG1lbnRPcmRlckxpc3Qge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBPcmRlckFjdGlvbnMuTE9BRF9VU0VSX1JFUExFTklTSE1FTlRfT1JERVJTX1NVQ0NFU1M6IHtcbiAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZCA/IGFjdGlvbi5wYXlsb2FkIDogaW5pdGlhbFN0YXRlO1xuICAgIH1cblxuICAgIGNhc2UgT3JkZXJBY3Rpb25zLkNBTkNFTF9SRVBMRU5JU0hNRU5UX09SREVSX1NVQ0NFU1M6IHtcbiAgICAgIGNvbnN0IGNhbmNlbGxlZFJlcGxlbmlzaG1lbnRPcmRlciA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgY29uc3QgdXNlclJlcGxlbmlzaG1lbnRPcmRlcnMgPSBbLi4uKHN0YXRlLnJlcGxlbmlzaG1lbnRPcmRlcnMgPz8gW10pXTtcblxuICAgICAgY29uc3QgaW5kZXggPSB1c2VyUmVwbGVuaXNobWVudE9yZGVycy5maW5kSW5kZXgoXG4gICAgICAgIChyZXBsZW5pc2htZW50T3JkZXI6IFJlcGxlbmlzaG1lbnRPcmRlcikgPT5cbiAgICAgICAgICByZXBsZW5pc2htZW50T3JkZXIucmVwbGVuaXNobWVudE9yZGVyQ29kZSA9PT1cbiAgICAgICAgICBjYW5jZWxsZWRSZXBsZW5pc2htZW50T3JkZXIucmVwbGVuaXNobWVudE9yZGVyQ29kZVxuICAgICAgKTtcblxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXNlclJlcGxlbmlzaG1lbnRPcmRlcnNbaW5kZXhdID0ge1xuICAgICAgICAgIC4uLmNhbmNlbGxlZFJlcGxlbmlzaG1lbnRPcmRlcixcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHJlcGxlbmlzaG1lbnRPcmRlcnM6IHVzZXJSZXBsZW5pc2htZW50T3JkZXJzIH07XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdfQ==