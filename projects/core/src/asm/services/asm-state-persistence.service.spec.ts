import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthStorageService } from '../../auth/facade/auth-storage.service';
import { UserToken } from '../../auth/models/token-types.model';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { AsmActions, ASM_FEATURE, StateWithAsm } from '../store';
import * as fromAsmReducers from '../store/reducers/index';
import { AsmStatePersistenceService } from './asm-state-persistence.service';

class MockAuthStorageService {
  setCSAgentToken() {}
  getCSAgentToken() {
    return of({});
  }
}

describe('AsmStatePersistenceService', () => {
  let service: AsmStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let store: Store<StateWithAsm>;
  let authStorageService: AuthStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromAsmReducers.getReducers()),
      ],
      providers: [
        AsmStatePersistenceService,
        StatePersistenceService,
        { provide: AuthStorageService, useClass: MockAuthStorageService },
      ],
    });

    service = TestBed.inject(AsmStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(Store);
    authStorageService = TestBed.inject(AuthStorageService);
    spyOn(store, 'dispatch').and.stub();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be updated after read from storage', () => {
    spyOn(authStorageService, 'setCSAgentToken').and.callThrough();

    service['onRead']({
      ui: { collapsed: true },
      token: { access_token: 'token' },
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.AsmUiUpdate({ collapsed: true })
    );
    expect(
      authStorageService.setCSAgentToken({ access_token: 'token' } as UserToken)
    );
  });

  it('should call persistenceService with correct attributes', () => {
    const state$ = of('');
    spyOn(service as any, 'getAsmState').and.returnValue(state$);

    service.sync();

    expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
      jasmine.objectContaining({
        key: 'asm',
        state$,
      })
    );
    expect(service['getAsmState']).toHaveBeenCalled();
  });

  it('should return state from asm store', () => {
    spyOn(authStorageService, 'getCSAgentToken').and.returnValue(
      of({
        access_token: 'token',
        refresh_token: 'refresh_token',
      } as UserToken)
    );

    service['getAsmState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({
          ui: { collapsed: false },
          token: { access_token: 'token', refresh_token: 'refresh_token' },
        } as any);
      });
  });
});
