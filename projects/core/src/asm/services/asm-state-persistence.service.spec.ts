import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthToken } from '../../auth/user-auth/models/auth-token.model';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { AsmActions, ASM_FEATURE, StateWithAsm } from '../store';
import * as fromAsmReducers from '../store/reducers/index';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';
import { AsmStatePersistenceService } from './asm-state-persistence.service';

class MockAsmAuthStorageService implements Partial<AsmAuthStorageService> {
  setEmulatedUserToken() {}
  getEmulatedUserToken() {
    return {} as AuthToken;
  }
  setTokenTarget() {}
  getTokenTarget() {
    return of(TokenTarget.CSAgent);
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
    spyOn(asmAuthStorageService, 'setEmulatedUserToken').and.callThrough();
    spyOn(asmAuthStorageService, 'setTokenTarget').and.callThrough();

    service['onRead']({
      ui: { collapsed: true },
      emulatedUserToken: {
        access_token: 'token',
        access_token_stored_at: '1000',
      },
      tokenTarget: TokenTarget.CSAgent,
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.AsmUiUpdate({ collapsed: true })
    );
    expect(
      asmAuthStorageService.setEmulatedUserToken({
        access_token: 'token',
        access_token_stored_at: '1000',
      } as AuthToken)
    );
    expect(asmAuthStorageService.setTokenTarget).toHaveBeenCalledWith(
      TokenTarget.CSAgent
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
    spyOn(asmAuthStorageService, 'getEmulatedUserToken').and.returnValue({
      access_token: 'token',
      access_token_stored_at: '1000',
      refresh_token: 'refresh_token', // token should not be saved
    });
    spyOn(asmAuthStorageService, 'getTokenTarget').and.returnValue(
      of(TokenTarget.User)
    );

    service['getAsmState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({
          ui: { collapsed: false },
          emulatedUserToken: {
            access_token: 'token',
            access_token_stored_at: '1000',
          },
          tokenTarget: TokenTarget.User,
        });
      });
  });
});
