import { Observable } from 'rxjs';
import { Order, OrderHistoryList } from '../../model/order.model';

export abstract class OrderAdapter {
  abstract place(userId: string, cartId: string): Observable<Order>;

  abstract load(userId: string, orderCode: string): Observable<Order>;

  abstract loadHistory(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<OrderHistoryList>;
}
