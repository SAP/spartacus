import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseMessageComponent } from '../base-message.component';
import { MessageData } from '../message.model';
import { NotificationMessageComponent } from '../notification/notification-message.component';
import { MessageRenderService } from './message-render.service';

@Component({ template: '' })
class MockComponent extends BaseMessageComponent {}

describe('MessageRenderService', () => {
  let service: MessageRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
    });

    service = TestBed.inject(MessageRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve NotificationMessageComponent by default', () => {
    const factory = service.getComponent({});
    expect(factory.componentType).toEqual(NotificationMessageComponent);
  });

  it('should resolve given component', () => {
    const factory = service.getComponent({ component: MockComponent });
    expect(factory.componentType).toEqual(MockComponent);
  });

  it('should inject message data', () => {
    const mockMessage = { message: { raw: 'mock message' } };
    const injector = service.getInjector(mockMessage);
    expect(injector.get(MessageData)).toEqual(mockMessage);
  });
});
