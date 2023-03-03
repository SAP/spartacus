import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import './augmented-request';
import { RequestLoggingService } from './request-logging.service';

jest.spyOn(console, 'log').mockImplementation();

const mockRequest = {
  body: {},
} as Request;

describe('RequestLoggingService', () => {
  let service: RequestLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestLoggingService,
        { provide: REQUEST, useValue: mockRequest },
      ],
    });
    service = TestBed.inject(RequestLoggingService);
    mockRequest.uuid = 'testUuid';
    mockRequest.startTime = Date.now();
  });

  describe('log', () => {
    it('should log message with request uuid and time', () => {
      service.log('test message');
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('testUuid - test message (ms:')
      );
    });
  });
});
