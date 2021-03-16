import { TestBed } from '@angular/core/testing';
import { GlobalMessageType } from 'projects/core/src/global-message/models/global-message.model';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });

    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('message type', () => {
    it('should default to MSG_TYPE_INFO', () => {
      let result;
      service.get().subscribe((msg) => (result = msg.type));
      service.add({});
      expect(result).toEqual(GlobalMessageType.MSG_TYPE_INFO);
    });

    it('should not override to message type', () => {
      let result;
      service.get().subscribe((msg) => (result = msg.type));
      service.add({ type: GlobalMessageType.MSG_TYPE_ERROR });
      expect(result).toEqual(GlobalMessageType.MSG_TYPE_ERROR);
    });
  });

  describe('message timeout', () => {
    it('should default timeout to 3000 for INFO messages', () => {
      let messageTimeout;
      service.get().subscribe((msg) => (messageTimeout = msg.timeout));
      service.add({});
      expect(messageTimeout).toEqual(3000);
    });

    it('should not override timeout', () => {
      let messageTimeout;
      service.get().subscribe((msg) => (messageTimeout = msg.timeout));
      service.add({ timeout: 1000 });
      expect(messageTimeout).toEqual(1000);
    });

    it('should not default timeout for non-info message', () => {
      let messageTimeout;
      service.get().subscribe((msg) => (messageTimeout = msg.timeout));
      service.add({ type: GlobalMessageType.MSG_TYPE_ERROR });
      expect(messageTimeout).toEqual(undefined);
    });
  });

  it('should return an active event subject', () => {
    let eventData;
    const eventSubject = service.add({});
    eventSubject.subscribe((ev) => (eventData = ev));
    eventSubject.next({ close: true });
    expect(eventData).toEqual({ close: true });
  });

  it('should emit close event data', () => {
    let eventData;
    const eventSubject = service.add({});
    eventSubject.subscribe((ev) => (eventData = ev));
    service.close(eventSubject);
    expect(eventData).toEqual({ close: true });
  });

  it('should clear the message', () => {
    let eventData;
    const eventSubject = service.add({});
    eventSubject.subscribe((ev) => (eventData = ev));
    service.clear();
    expect(eventData).toBeFalsy();
  });
});
