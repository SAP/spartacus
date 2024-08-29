import { TestBed } from '@angular/core/testing';
import { OmfOrderHistoryService } from './omf-order-history.service';
import { StoreModule } from '@ngrx/store';

describe('OmfOrderHistoryService', () => {
  let service: OmfOrderHistoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [OmfOrderHistoryService],
    });
    service = TestBed.inject(OmfOrderHistoryService);
  });
  describe('getQueryParams', () => {
    it('should return a routing query param with given guid', () => {
      const param = service.getQueryParams({ guid: '123' });
      expect(param).toEqual({ guid: '123' });
    });
    it('should return null if no guid exists', () => {
      const param = service.getQueryParams({ code: '123' });
      expect(param).toEqual(null);
    });
  });
});
