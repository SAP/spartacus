import { Observable } from 'rxjs';

@Injectable()
export class FutureStockConnector {
	constructor(protected adapter: FutureStockAdapter) {}

  public getFutureStock(productCode: string, userId: string): Observable<ProductFutureStock> {
		return this.adapter.getFutureStock(productCode, userId);
	}

	public getFutureStocks(productCodes: string, userId: string): Observable<ProductFutureStock[]> {
		return this.adapter.getFutureStocks(productCodes, userId);
	}
}
