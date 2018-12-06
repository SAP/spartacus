import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { GlobalMessageComponent } from './global-messsage.component';
import { GlobalMessageType } from './../models/message.model';
import { GlobalMessageService } from '../facade/global-message.service';

const mockMessages = new Map<GlobalMessageType, string[]>();
mockMessages.set(GlobalMessageType.MSG_TYPE_CONFIRMATION, ['Confirmation']);
mockMessages.set(GlobalMessageType.MSG_TYPE_CONFIRMATION, ['Confirmation']);
mockMessages.set(GlobalMessageType.MSG_TYPE_INFO, ['Info']);
mockMessages.set(GlobalMessageType.MSG_TYPE_ERROR, ['Error']);

class MockMessageService {
  remove = createSpy();
  getAllMessages() {
    return of(mockMessages);
  }
}
describe('GlobalMessageComponent', () => {
  let globalMessageComponent: GlobalMessageComponent;
  let fixture: ComponentFixture<GlobalMessageComponent>;
  let messageService: GlobalMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalMessageComponent],
      providers: [
        { provide: GlobalMessageService, useClass: MockMessageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    globalMessageComponent = fixture.componentInstance;

    messageService = TestBed.get(GlobalMessageService);
  });

  it('should create', () => {
    expect(globalMessageComponent).toBeTruthy();
  });

  it('should not have duplicate messages per message type', () => {
    globalMessageComponent.ngOnInit();
    globalMessageComponent.messages$.subscribe(messages => {
      expect(messages.get(GlobalMessageType.MSG_TYPE_CONFIRMATION).length).toBe(
        1
      );
    });
  });

  it('should be able to remove messages', () => {
    globalMessageComponent.clear(GlobalMessageType.MSG_TYPE_CONFIRMATION, 0);
    expect(messageService.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      0
    );
  });
});
