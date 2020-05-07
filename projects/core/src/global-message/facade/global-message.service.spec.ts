import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { GlobalMessageType } from '../models/global-message.model';
import { GlobalMessageActions } from '../store/actions/index';
import {
  GLOBAL_MESSAGE_FEATURE,
  GlobalMessageState,
} from '../store/global-message-state';
import * as fromStoreReducers from '../store/reducers/index';
import { GlobalMessageService } from './global-message.service';
import createSpy = jasmine.createSpy;

const mockMessages = {
  [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'Confirmation' }],
  [GlobalMessageType.MSG_TYPE_ERROR]: [{ raw: 'Error' }],
};

describe('GlobalMessageService', () => {
  const mockSelect = createSpy('select').and.returnValue(() =>
    of(mockMessages)
  );

  let service: GlobalMessageService;
  let store: Store<GlobalMessageState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          GLOBAL_MESSAGE_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [GlobalMessageService],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);
    service = TestBed.inject(GlobalMessageService);
  });

  it('Should GlobalMessageService be injected', inject(
    [GlobalMessageService],
    (globalMessageService: GlobalMessageService) => {
      expect(globalMessageService).toBeTruthy();
    }
  ));

  it('Should be able to get all messages', () => {
    service.get().subscribe((results) => {
      expect(results).toEqual(mockMessages);
    });
  });

  it('Should be able to add a message', () => {
    service.add('Test error message', GlobalMessageType.MSG_TYPE_ERROR);
    expect(store.dispatch).toHaveBeenCalledWith(
      new GlobalMessageActions.AddMessage({
        type: GlobalMessageType.MSG_TYPE_ERROR,
        text: { raw: 'Test error message' },
        timeout: undefined,
      })
    );
  });

  it('Should be able to add a translation message', () => {
    service.add(
      { key: 'test.key', params: { param: 'value' } },
      GlobalMessageType.MSG_TYPE_ERROR
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new GlobalMessageActions.AddMessage({
        type: GlobalMessageType.MSG_TYPE_ERROR,
        text: { key: 'test.key', params: { param: 'value' } },
        timeout: undefined,
      })
    );
  });

  it('Should be able to add a message with a duration', () => {
    service.add('Test error message', GlobalMessageType.MSG_TYPE_ERROR, 10000);
    expect(store.dispatch).toHaveBeenCalledWith(
      new GlobalMessageActions.AddMessage({
        type: GlobalMessageType.MSG_TYPE_ERROR,
        text: { raw: 'Test error message' },
        timeout: 10000,
      })
    );
  });

  it('Should be able to remove a message', () => {
    service.remove(GlobalMessageType.MSG_TYPE_ERROR, 0);
    expect(store.dispatch).toHaveBeenCalledWith(
      new GlobalMessageActions.RemoveMessage({
        type: GlobalMessageType.MSG_TYPE_ERROR,
        index: 0,
      })
    );
  });

  it('should be able to remove messages by type', () => {
    service.remove(GlobalMessageType.MSG_TYPE_ERROR);
    expect(store.dispatch).toHaveBeenCalledWith(
      new GlobalMessageActions.RemoveMessagesByType(
        GlobalMessageType.MSG_TYPE_ERROR
      )
    );
  });
});
