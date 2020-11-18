/* tslint:disable:deprecation */
// for now there is no better way than to use document.createElement here, therefore we need to disable tslint deprecation rule here
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ExternalJsFileLoader } from './external-js-file-loader.service';

const SCRIPT_LOAD_URL = 'http://url/';

class DocumentMock {
  createElement() {}
  appendChild() {}
}

describe('ExternalJsFileLoader', () => {
  let externalJsFileLoader: ExternalJsFileLoader;

  let documentMock: Document;
  let jsDomElement: any;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        ExternalJsFileLoader,
        {
          provide: DOCUMENT,
          useClass: DocumentMock,
        },
      ],
    });

    externalJsFileLoader = bed.inject(ExternalJsFileLoader);
    documentMock = bed.inject(DOCUMENT);
    jsDomElement = document.createElement('script');
  });

  it('should load script with params and load/error callbacks', () => {
    // given
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock, 'appendChild').and.callThrough();
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    const params = { param1: 'value1', param2: 'value2' };
    const callback = function () {};
    const errorCallback = function () {};

    // when
    externalJsFileLoader.load(SCRIPT_LOAD_URL, params, callback, errorCallback);

    // then
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.type).toEqual('text/javascript');
    expect(jsDomElement.src).toContain(SCRIPT_LOAD_URL);
    expect(jsDomElement.src.split('?')[1]).toEqual(
      'param1=value1&param2=value2'
    );
    expect(jsDomElement.addEventListener).toHaveBeenCalledWith(
      'load',
      callback
    );
    expect(jsDomElement.addEventListener).toHaveBeenCalledWith(
      'error',
      errorCallback
    );
  });

  it('should load script with params and callback', () => {
    // given
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock, 'appendChild').and.callThrough();
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    const params = { param1: 'value1', param2: 'value2' };
    const callback = function () {};

    // when
    externalJsFileLoader.load(SCRIPT_LOAD_URL, params, callback);

    // then
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.type).toEqual('text/javascript');
    expect(jsDomElement.src).toContain(SCRIPT_LOAD_URL);
    expect(jsDomElement.src.split('?')[1]).toEqual(
      'param1=value1&param2=value2'
    );
    expect(jsDomElement.addEventListener).toHaveBeenCalledWith(
      'load',
      callback
    );
  });

  it('should load script with params', () => {
    // given
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock, 'appendChild').and.callThrough();
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    const params = { param1: 'value1', param2: 'value2 plus space' };

    // when
    externalJsFileLoader.load(SCRIPT_LOAD_URL, params);

    // then
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.type).toEqual('text/javascript');
    expect(jsDomElement.src).toContain(SCRIPT_LOAD_URL);
    expect(jsDomElement.src.split('?')[1]).toEqual(
      'param1=value1&param2=value2%20plus%20space'
    );
    expect(jsDomElement.addEventListener).toHaveBeenCalledTimes(0);
  });

  it('should load script', () => {
    // given
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock, 'appendChild').and.callThrough();
    spyOn(jsDomElement, 'addEventListener').and.callThrough();

    // when
    externalJsFileLoader.load(SCRIPT_LOAD_URL);

    // then
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.type).toEqual('text/javascript');
    expect(jsDomElement.src).toEqual(SCRIPT_LOAD_URL);
    expect(jsDomElement.addEventListener).toHaveBeenCalledTimes(0);
  });
});
