import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AsmAuthStorageService, TokenTarget } from '@spartacus/asm/root';
import { AuthToken, StatePersistenceService } from '@spartacus/core';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AsmActions, ASM_FEATURE, StateWithAsm } from '../store';
import * as fromAsmReducers from '../store/reducers/index';
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
    vi.spyOn(store, 'dispatch').mockImplementation(() => {});
    vi.spyOn(persistenceService, 'syncWithStorage').mockImplementation(() => {});
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be updated after read from storage', () => {
    vi.spyOn(asmAuthStorageService, 'setEmulatedUserToken');
    vi.spyOn(asmAuthStorageService, 'setTokenTarget');

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
    vi.spyOn(service as any, 'getAsmState').mockReturnValue(state$);

    service.initSync();

    expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'asm',
        state$,
      })
    );
    expect(service['getAsmState']).toHaveBeenCalled();
  });

  it('should return state from asm store', async () => {
    vi.spyOn(asmAuthStorageService, 'getEmulatedUserToken').mockReturnValue({
      access_token: 'token',
      access_token_stored_at: '1000',
      refresh_token: 'refresh_token', // this token should not be saved
    });
    vi.spyOn(asmAuthStorageService, 'getTokenTarget').mockReturnValue(
      of(TokenTarget.User)
    );

    const state = await firstValueFrom(service['getAsmState']());
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
