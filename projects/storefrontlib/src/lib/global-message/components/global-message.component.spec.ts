import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { GlobalMessageComponent } from './global-messsage.component';
import * as fromGlobalMessage from '../store';
import { GlobalMessageType } from './../models/message.model';

describe('GlobalMessageComponent', () => {
  let store: Store<fromGlobalMessage.GlobalMessageState>;
  let globalMessageComponent: GlobalMessageComponent;
  let fixture: ComponentFixture<GlobalMessageComponent>;

  const mockMessages = new Map<GlobalMessageType, string[]>();
  mockMessages.set(GlobalMessageType.MSG_TYPE_CONFIRMATION, ['Confirmation']);
  mockMessages.set(GlobalMessageType.MSG_TYPE_CONFIRMATION, ['Confirmation']);
  mockMessages.set(GlobalMessageType.MSG_TYPE_INFO, ['Info']);
  mockMessages.set(GlobalMessageType.MSG_TYPE_ERROR, ['Error']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromGlobalMessage.getReducers
        })
      ],
      declarations: [GlobalMessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    globalMessageComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    globalMessageComponent.messages$ = of(mockMessages);

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(globalMessageComponent).toBeTruthy();
  });

  it('should not have duplicate messages per message type', () => {
    const subscription = globalMessageComponent.messages$.subscribe(
      messages => {
        expect(
          messages.get(GlobalMessageType.MSG_TYPE_CONFIRMATION).length
        ).toBe(1);
      }
    );
    subscription.unsubscribe();
  });

  it('should be able to remove messages', () => {
    globalMessageComponent.clear(GlobalMessageType.MSG_TYPE_CONFIRMATION, 0);
    const action = new fromGlobalMessage.RemoveMessage({
      type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      index: 0
    });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
