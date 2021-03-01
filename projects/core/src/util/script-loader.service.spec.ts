/* eslint-disable import/no-deprecated */
// for now there is no better way than to use document.createElement here, therefore we need to disable eslint deprecation rule here
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScriptLoader, ScriptPlacement } from './script-loader.service';

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

const callback = function () {};
const errorCallback = function () {};

let scriptLoader: ScriptLoader;
let documentMock: Document;
let jsDomElement: any;

describe('ScriptLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScriptLoader,
        {
          provide: DOCUMENT,
          useClass: DocumentMock,
        },
      ],
    });

    scriptLoader = TestBed.inject(ScriptLoader);
    documentMock = TestBed.inject(DOCUMENT);
    jsDomElement = document.createElement('script');
  });

  it('should add script with params and load/error callbacks', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    spyOn(jsDomElement, 'addEventListener').and.callThrough();
    const params = { param1: 'value1', param2: 'value2' };

    scriptLoader.embedScript({
      src: SCRIPT_LOAD_URL,
      params,
      attributes: undefined,
      callback,
      errorCallback,
    });
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

    scriptLoader.embedScript({
      src: SCRIPT_LOAD_URL,
      params: undefined,
      attributes: {
        type: 'text/javascript',
        'data-custom-attr': 'custom-attribute-value',
      },
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

    scriptLoader.embedScript({
      src: SCRIPT_LOAD_URL,
      params: undefined,
      attributes: undefined,
      callback: undefined,
      errorCallback: undefined,
      placement: ScriptPlacement.BODY,
    });
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(documentMock.body.appendChild).toHaveBeenCalled();
  });
});

describe('with SSR', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScriptLoader,
        {
          provide: DOCUMENT,
          useClass: DocumentMock,
        },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    scriptLoader = TestBed.inject(ScriptLoader);
    documentMock = TestBed.inject(DOCUMENT);
    jsDomElement = document.createElement('script');
  });

  it('should skip during SSR if there is callback or errorCallback', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);

    scriptLoader.embedScript({
      src: SCRIPT_LOAD_URL,
      params: undefined,
      attributes: undefined,
      callback,
      errorCallback,
    });
    expect(documentMock.createElement).not.toHaveBeenCalledWith('script');
  });

  it('should add script during SSR', () => {
    spyOn(documentMock, 'createElement').and.returnValue(jsDomElement);
    scriptLoader.embedScript({
      src: SCRIPT_LOAD_URL,
      params: undefined,
      attributes: undefined,
    });

    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(documentMock.createElement).toHaveBeenCalledTimes(1);
  });
});
