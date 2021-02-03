/* tslint:disable:deprecation */
// for now there is no better way than to use document.createElement here, therefore we need to disable tslint deprecation rule here
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ExternalJsFileLoader,
  ScriptAddTo,
} from './external-js-file-loader.service';

const SCRIPT_LOAD_URL = 'http://url/';

class DocumentMock {
  head = {
    appendChild() {},
  };
  body = {
    appendChild() {},
  };
  createElement() {}
  querySelector() {}
}

let externalJsFileLoader: ExternalJsFileLoader;
let documentMock: Document;
let jsDomElement: any;

describe('ExternalJsFileLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExternalJsFileLoader,
        {
          provide: DOCUMENT,
          useClass: DocumentMock,
        },
      ],
    });

    externalJsFileLoader = TestBed.inject(ExternalJsFileLoader);
    documentMock = TestBed.inject(DOCUMENT);
    jsDomElement = document.createElement('script');
  });

  it('should add script with params and load/error callbacks', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    const params = { param1: 'value1', param2: 'value2' };
    const callback = function () {};
    const errorCallback = function () {};

    externalJsFileLoader.addScript(
      SCRIPT_LOAD_URL,
      params,
      undefined,
      callback,
      errorCallback
    );
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
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

  it('should add script with attributes', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);

    externalJsFileLoader.addScript(SCRIPT_LOAD_URL, undefined, {
      type: 'text/javascript',
      'data-custom-attr': 'custom-attribute-value',
    });
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.src).toEqual(SCRIPT_LOAD_URL);
    expect(jsDomElement.type).toEqual('text/javascript');
    expect(jsDomElement.getAttribute('data-custom-attr')).toEqual(
      'custom-attribute-value'
    );
  });

  it('should be able to add script in body element', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(documentMock.body, 'appendChild').and.callThrough();

    externalJsFileLoader.addScript(
      SCRIPT_LOAD_URL,
      undefined,
      undefined,
      undefined,
      undefined,
      false,
      ScriptAddTo.BODY
    );
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(documentMock.body.appendChild).toHaveBeenCalled();
  });
});

describe('with SSR', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExternalJsFileLoader,
        {
          provide: DOCUMENT,
          useClass: DocumentMock,
        },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    externalJsFileLoader = TestBed.inject(ExternalJsFileLoader);
    documentMock = TestBed.inject(DOCUMENT);
    jsDomElement = document.createElement('script');
  });

  it('should skip during SSR if onSsr is false', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);

    externalJsFileLoader.addScript(
      SCRIPT_LOAD_URL,
      undefined,
      undefined,
      undefined,
      undefined,
      false
    );
    expect(documentMock.createElement).not.toHaveBeenCalledWith('script');
  });

  it('should add script during SSR, but skip during CSR', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    externalJsFileLoader.addScript(
      SCRIPT_LOAD_URL,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );

    // call again during CSR
    spyOn(documentMock, 'querySelector').and.returnValue(jsDomElement);
    externalJsFileLoader.addScript(
      SCRIPT_LOAD_URL,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );
    // only create element once
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(documentMock.createElement).toHaveBeenCalledTimes(1);
  });
});
