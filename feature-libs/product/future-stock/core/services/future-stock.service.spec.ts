import { TestBed } from "@angular/core/testing";
import { RoutingService, UserIdService } from "@spartacus/core";
import { Observable, of } from "rxjs";
import { FutureStockConnector } from "../connectors/future-stock.connector";
import { FutureStockService } from "./future-stock.service";

import createSpy = jasmine.createSpy;
class MockFutureStockConnector implements Partial<FutureStockConnector> {
  getFutureStock = createSpy().and.callFake(() => of(mockFutureStocks));
}

const mockUserId = 'current';

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of(mockUserId);
  }
}

const mockRouterState = {
  state: {
    params: {
      productCode: '123123123',
    },
  },
};

class MockRoutingService {
  getRouterState() {
    return of(mockRouterState);
  }
}

const mockFutureStocks = {
	futureStocks: [
		{
			formattedDate: '10/11/2020',
			stock: {
				stockLevel: 15,
			},
		},
		{
			formattedDate: '11/11/2020',
			stock: {
				stockLevel: 20,
			},
		},
		{
			formattedDate: '12/11/2020',
			stock: {
				stockLevel: 25,
			},
		},
	],
};

describe('FutureStockService', () => {
  let service: FutureStockService;
  let connector: FutureStockConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				FutureStockService,
				{ provide: UserIdService, useClass: MockUserIdService },
				{ provide: FutureStockConnector, useClass: MockFutureStockConnector},
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.inject(FutureStockService);
    connector = TestBed.inject(FutureStockConnector);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should get future stock', () => {
		let result;

		service.getFutureStock().subscribe((data) => {
			result = data;
		})
		.unsubscribe();
    expect(result).toEqual(mockFutureStocks);
  });

	it('should call connector', () => {
		service.getFutureStock().subscribe(() => {
		})
		.unsubscribe();

    expect(connector.getFutureStock).toHaveBeenCalled();
	});
});

