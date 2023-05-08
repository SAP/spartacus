import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CdcOrgUnitService } from './cdc-org-unit.service';

describe('CdcOrgUnitService', () => {
  let service: CdcOrgUnitService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [],
      providers: [],
    });
    service = TestBed.inject(CdcOrgUnitService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('isUpdatingUnitAllowed()', () => {
    it('should return if updating a unit is allowed in current scenario', () => {
      expect(service.isUpdatingUnitAllowed()).toEqual(false);
    });
  });
});
