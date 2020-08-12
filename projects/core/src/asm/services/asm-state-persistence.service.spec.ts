import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserToken } from '../../auth/user-auth/models/user-token.model';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { AsmActions, ASM_FEATURE, StateWithAsm } from '../store';
import * as fromAsmReducers from '../store/reducers/index';
import { AsmAuthStorageService } from './asm-auth-storage.service';
import { AsmStatePersistenceService } from './asm-state-persistence.service';

class MockAsmAuthStorageService {
  setCSAgentToken() {}
  getCSAgentToken() {
    return of({});
  }
  switchToEmulated() {}
  isEmulated() {
    return of(false);
  }
}

describe('AsmStatePersistenceService', () => {
  let service: AsmStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let store: Store<StateWithAsm>;
  let asmAuthStorageService: AsmAuthStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromAsmReducers.getReducers()),
      ],
      providers: [
        AsmStatePersistenceService,
        StatePersistenceService,
        { provide: AsmAuthStorageService, useClass: MockAsmAuthStorageService },
      ],
    });

    service = TestBed.inject(AsmStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(Store);
    asmAuthStorageService = TestBed.inject(AsmAuthStorageService);
    spyOn(store, 'dispatch').and.stub();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be updated after read from storage', () => {
    spyOn(asmAuthStorageService, 'setCSAgentToken').and.callThrough();
    spyOn(asmAuthStorageService, 'switchToEmulated').and.callThrough();

    service['onRead']({
      ui: { collapsed: true },
      token: { access_token: 'token' },
      isEmulated: true,
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.AsmUiUpdate({ collapsed: true })
    );
    expect(
      asmAuthStorageService.setCSAgentToken({
        access_token: 'token',
      } as UserToken)
    );
    expect(asmAuthStorageService.switchToEmulated).toHaveBeenCalled();
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
    spyOn(asmAuthStorageService, 'getCSAgentToken').and.returnValue(
      of({
        access_token: 'token',
        refresh_token: 'refresh_token',
      } as UserToken)
    );
    spyOn(asmAuthStorageService, 'isEmulated').and.returnValue(of(false));

    service['getAsmState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({
          ui: { collapsed: false },
          token: { access_token: 'token', refresh_token: 'refresh_token' },
          isEmulated: false,
        } as any);
      });
  });
});
