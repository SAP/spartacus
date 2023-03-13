import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CdcB2BUserService } from './cdc-b2b-user.service';

describe('CdcB2BUserService', () => {
  let service: CdcB2BUserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [],
      providers: [],
    });
    service = TestBed.inject(CdcB2BUserService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('isUpdatingUserAllowed()', () => {
    it('should return if updating a user is allowed in current scenario', () => {
      expect(service.isUpdatingUserAllowed()).toEqual(false);
    });
  });
});
