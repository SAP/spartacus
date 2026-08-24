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
const occBaseUrl = 'https://localhost:9002/occ/v2/powertools-spa';

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

const mockProductCardProductNotFoundResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  url: `${occBaseUrl}/products/CONF_CAMERA_SLR?fields=code,description,images(DEFAULT)`,
  error: {
    errors: [
      {
        type: 'UnknownIdentifierError',
        message: "Product with code 'CONF_CAMERA_SLR' not found!",
      },
    ],
  },
} as HttpErrorResponse;

const mockEncodedProductCardProductNotFoundResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  url: `${occBaseUrl}/products/CONF_CAMERA_SLR?fields=code,description,images%28DEFAULT%29`,
  error: {
    errors: [
      {
        type: 'UnknownIdentifierError',
        message: "Product with code 'CONF_CAMERA_SLR' not found!",
      },
    ],
  },
} as HttpErrorResponse;

const mockProductDetailsNotFoundResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  url: `${occBaseUrl}/products/MISSING?fields=averageRating,stock(DEFAULT),description,code,images(FULL)`,
  error: {
    errors: [
      {
        type: 'UnknownIdentifierError',
        message: "Product with code 'MISSING' not found!",
      },
    ],
  },
} as HttpErrorResponse;

const mockProductListNotFoundResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  url: `${occBaseUrl}/products/MISSING?fields=code,purchasable,name,summary,price(formattedValue),images(DEFAULT,galleryIndex),baseProduct`,
  error: {
    errors: [
      {
        type: 'UnknownIdentifierError',
        message: "Product with code 'MISSING' not found!",
      },
    ],
  },
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

    it('should detect missing catalog product for a configurator product card', () => {
      expect(
        classUnderTest.hasMatch(mockProductCardProductNotFoundResponse)
      ).toBe(true);
    });

    it('should detect missing catalog product when product-card fields are URL-encoded', () => {
      expect(
        classUnderTest.hasMatch(mockEncodedProductCardProductNotFoundResponse)
      ).toBe(true);
    });

    it('should not detect a missing product on the product details OCC request', () => {
      expect(classUnderTest.hasMatch(mockProductDetailsNotFoundResponse)).toBe(
        false
      );
    });

    it('should not detect a missing product on the product list OCC request', () => {
      expect(classUnderTest.hasMatch(mockProductListNotFoundResponse)).toBe(
        false
      );
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

    it('should raise no message when a product-card catalog product is missing', () => {
      spyOn(globalMessageService, 'add');

      classUnderTest.handleError(
        mockRequest,
        mockProductCardProductNotFoundResponse
      );

      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
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

    it('should return true in case a product-card catalog product is missing', () => {
      expect(
        classUnderTest['isRelatedToProductConfigurator'](
          mockProductCardProductNotFoundResponse
        )
      ).toBe(true);
    });
  });

  describe('isProductCardProductNotFound', () => {
    it('should return false in case response is undefined', () => {
      expect(classUnderTest['isProductCardProductNotFound'](undefined)).toBe(
        false
      );
    });

    it('should return false when the OCC URL is missing', () => {
      expect(
        classUnderTest['isProductCardProductNotFound']({
          status: HttpResponseStatus.BAD_REQUEST,
          url: null,
          error: {
            errors: [
              {
                type: 'UnknownIdentifierError',
                message: "Product with code 'X' not found!",
              },
            ],
          },
        } as HttpErrorResponse)
      ).toBe(false);
    });

    it('should return false for an UnknownIdentifierError that is not a product GET', () => {
      expect(
        classUnderTest['isProductCardProductNotFound']({
          status: HttpResponseStatus.BAD_REQUEST,
          url: `${occBaseUrl}/users/current`,
          error: {
            errors: [{ type: 'UnknownIdentifierError', message: 'not found' }],
          },
        } as HttpErrorResponse)
      ).toBe(false);
    });
  });
});
