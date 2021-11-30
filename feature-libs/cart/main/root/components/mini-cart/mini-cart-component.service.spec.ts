import { TestBed } from '@angular/core/testing';
import {
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { CartConfig } from '../../config/cart-config';
import { ActiveCartFacade } from '../../facade/active-cart.facade';
import { Cart } from '../../models/cart.model';
import { MiniCartComponentService } from './mini-cart-component.service';

const activeCart = new ReplaySubject<Cart>();

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return activeCart.asObservable();
  }
}

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return of();
  }
}

const mockStatePersistenceService: Partial<StatePersistenceService> = {};
const mockSiteContextParamsService: Partial<SiteContextParamsService> = {};
const mockCartConfig: CartConfig = {};

fdescribe('MiniCartComponentService', () => {
  let service: MiniCartComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: StatePersistenceService,
          useValue: mockStatePersistenceService,
        },
        {
          provide: SiteContextParamsService,
          useValue: mockSiteContextParamsService,
        },
        { provide: CartConfig, useValue: mockCartConfig },
      ],
    });
    service = TestBed.inject(MiniCartComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
