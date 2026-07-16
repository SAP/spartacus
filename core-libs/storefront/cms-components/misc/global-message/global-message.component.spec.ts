import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { GlobalMessageComponent } from './global-message.component';

const mockMessages: GlobalMessageEntities = {
  [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'Confirmation' }],
  [GlobalMessageType.MSG_TYPE_INFO]: [{ raw: 'Info' }],
  [GlobalMessageType.MSG_TYPE_ERROR]: [{ raw: 'Error' }],
};

class MockMessageService {
  remove = vi.fn();
  get(): Observable<GlobalMessageEntities> {
    return of(mockMessages);
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

describe('GlobalMessageComponent', () => {
  let globalMessageComponent: GlobalMessageComponent;
  let messageService: GlobalMessageService;
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GlobalMessageComponent],
      providers: [
        { provide: GlobalMessageService, useClass: MockMessageService },
      ],
    })
      .overrideComponent(GlobalMessageComponent, {
        remove: { imports: [IconComponent, TranslatePipe] },
        add: { imports: [MockCxIconComponent, MockTranslatePipe] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    globalMessageComponent = fixture.componentInstance;

    messageService = TestBed.inject(GlobalMessageService);
  });

  it('Should create Global message component', () => {
    expect(globalMessageComponent).toBeTruthy();
  });

  it('Should not have duplicate messages per message type', () => {
    globalMessageComponent.ngOnInit();
    globalMessageComponent.messages$.subscribe((messages) => {
      expect(messages[GlobalMessageType.MSG_TYPE_CONFIRMATION].length).toBe(1);
    });
  });

  it('Should be able to remove messages', () => {
    globalMessageComponent.clear(GlobalMessageType.MSG_TYPE_CONFIRMATION, 0);
    expect(messageService.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      0
    );
  });
});
