import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { TestBed } from '@angular/core/testing';
import { Attribute } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

const SCRIPT_LOAD_URL = 'http://url/';

class DocumentMock {
  createElement() {}
  appendChild() {}
}

fdescribe('ExternalJsFileLoader', () => {
  let externalJsFileLoader: ExternalJsFileLoader;

  let documentMock: Document;
  let jsDomElement: any;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        ExternalJsFileLoader,
        {
          provide: DOCUMENT,
          useClass: DocumentMock
        }
      ]
    });

    externalJsFileLoader = bed.get(ExternalJsFileLoader);
    documentMock = bed.get(DOCUMENT);
    jsDomElement = document.createElement('script');
  });

  it('should load script with params and callback', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock, 'appendChild').and.callThrough();
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    const params = { param1: 'value1', param2: 'value2' };
    const callback = function() {};
    externalJsFileLoader.load(SCRIPT_LOAD_URL, params, callback);

    expect(documentMock.createElement).toHaveBeenCalledWith('script');
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
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock, 'appendChild').and.callThrough();
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    const params = { param1: 'value1', param2: 'value2' };
    externalJsFileLoader.load(SCRIPT_LOAD_URL, params);

    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.src).toContain(SCRIPT_LOAD_URL);
    expect(jsDomElement.src.split('?')[1]).toEqual(
      'param1=value1&param2=value2'
    );
    expect(jsDomElement.addEventListener).toHaveBeenCalledTimes(0);
  });

  it('should load script', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock, 'appendChild').and.callThrough();
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    externalJsFileLoader.load(SCRIPT_LOAD_URL);

    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.src).toEqual(SCRIPT_LOAD_URL);
    expect(jsDomElement.addEventListener).toHaveBeenCalledTimes(0);
  });
});
