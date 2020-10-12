import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { AsmActions, ASM_FEATURE, StateWithAsm } from '../store';
import * as fromAsmReducers from '../store/reducers/index';
import { AsmStatePersistenceService } from './asm-state-persistence.service';

describe('AsmStatePersistenceService', () => {
  let service: AsmStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let store: Store<StateWithAsm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromAsmReducers.getReducers()),
      ],
      providers: [AsmStatePersistenceService, StatePersistenceService],
    });

    service = TestBed.inject(AsmStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.stub();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be updated after read from storage', () => {
    service['onRead']({
      ui: { collapsed: true },
      token: { access_token: 'token' },
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.AsmUiUpdate({ collapsed: true })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.SetCSAgentTokenData({ access_token: 'token' })
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
    service['getAsmState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({
          ui: { collapsed: false },
          // TODO: There should also be token state, but it is empty at the moment
          token: {},
        } as any);
      });
  });
});
