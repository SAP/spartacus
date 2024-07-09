import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';
import { ConfiguratorBadRequestHandler } from '@spartacus/product-configurator/rulebased/root';

const mockRequest = {} as HttpRequest<any>;

const mockAnotherIllegalStateErrorResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  error: {
    errors: [
      {
        message: 'Another issue',
        type: 'IllegalStateError',
      },
    ],
  },
} as HttpErrorResponse;

const mockMakeToStockIllegalStateErrorResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  error: {
    errors: [
      {
        message:
          "Product or its base product is defined as 'make-to-stock'. Configuration update for 'make-to-stock' products is not allowed.",
        type: 'IllegalStateError',
      },
    ],
  },
} as HttpErrorResponse;

const mockEmptyResponse = {
  error: null,
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}

  remove() {}
}

describe('ConfiguratorBadRequestHandler', () => {
  let classUnderTest: ConfiguratorBadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorBadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    classUnderTest = TestBed.inject(ConfiguratorBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should register 400 responseStatus', () => {
    expect(classUnderTest.responseStatus).toEqual(
      HttpResponseStatus.BAD_REQUEST
    );
  });

  it('should carry high priority', () => {
    expect(classUnderTest.getPriority()).toBe(Priority.NORMAL);
  });

  describe('hasMatch', () => {
    it('should not detect any issue', () => {
      expect(classUnderTest.hasMatch(mockEmptyResponse)).toBe(false);
    });

    it('should not detect another issue', () => {
      expect(
        classUnderTest.hasMatch(mockAnotherIllegalStateErrorResponse)
      ).toBe(false);
    });

    it('should detect make-to-stock issue', () => {
      expect(
        classUnderTest.hasMatch(mockMakeToStockIllegalStateErrorResponse)
      ).toBe(true);
    });
  });

  describe('handleError', () => {
    it('should be able to deal with an empty error response', () => {
      spyOn(globalMessageService, 'add');
      classUnderTest.handleError(mockRequest, mockEmptyResponse);

      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });

    it('should raise no message for IllegalStateError that are not related to make-to-stock', () => {
      spyOn(globalMessageService, 'add');

      classUnderTest.handleError(
        mockRequest,
        mockAnotherIllegalStateErrorResponse
      );

      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });

    it('should raise a message for IllegalStateError that are related to make-to-stock', () => {
      spyOn(globalMessageService, 'add');

      classUnderTest.handleError(
        mockRequest,
        mockMakeToStockIllegalStateErrorResponse
      );

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'configurator.httpHandlers.makeToStockBaseProductIssue' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('isNotEmpty', () => {
    it('should return false in case errors are null', () => {
      expect(classUnderTest['isNotEmpty'](null)).toBe(false);
    });

    it('should return false in case errors are undefined', () => {
      expect(classUnderTest['isNotEmpty'](undefined)).toBe(false);
    });

    it('should return false in case errors are empty', () => {
      expect(classUnderTest['isNotEmpty']([])).toBe(false);
    });

    it('should return true in case there are any errors', () => {
      const errors: ErrorModel[] = [
        { message: 'One issue', reason: 'Issue is thrown' },
      ];
      expect(classUnderTest['isNotEmpty'](errors)).toBe(true);
    });
  });

  describe('isRelatedToProductConfigurator', () => {
    it('should return false in case response is null', () => {
      expect(
        classUnderTest['isRelatedToProductConfigurator'](mockEmptyResponse)
      ).toBe(false);
    });

    it('should return false in case response is undefined', () => {
      expect(classUnderTest['isRelatedToProductConfigurator'](undefined)).toBe(
        false
      );
    });

    it('should return false in case response is not related to make-to-stock issue', () => {
      expect(
        classUnderTest['isRelatedToProductConfigurator'](
          mockAnotherIllegalStateErrorResponse
        )
      ).toBe(false);
    });

    it('should return false in case response is related to make-to-stock issue', () => {
      expect(
        classUnderTest['isRelatedToProductConfigurator'](
          mockMakeToStockIllegalStateErrorResponse
        )
      ).toBe(true);
    });
  });
});
