import { vi } from 'vitest';
import { DOCUMENT, PLATFORM_ID } from '@angular/core';
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
    vi.spyOn(documentMock, 'createElement').mockReturnValue(jsDomElement);
    vi.spyOn(jsDomElement, 'addEventListener');
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
    vi.spyOn(documentMock, 'createElement').mockReturnValue(jsDomElement);

    scriptLoader.embedScript({
      src: SCRIPT_LOAD_URL,
      params: undefined,
      attributes: {
        type: 'text/javascript',
        'data-custom-attr': 'custom-attribute-value',
        'mock-attr-key': 'mock-attr-value',
      },
    });
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.src).toEqual(SCRIPT_LOAD_URL);
    expect(jsDomElement.type).toEqual('text/javascript');
    expect(jsDomElement.getAttribute('data-custom-attr')).toEqual(
      'custom-attribute-value'
    );
    expect(jsDomElement.getAttribute('mock-attr-key')).toBeFalsy();
  });

  it('should add script with unrestricted custom attributes', () => {
    vi.spyOn(documentMock, 'createElement').mockReturnValue(jsDomElement);

    scriptLoader.embedScript({
      disableKeyRestriction: true,
      src: SCRIPT_LOAD_URL,
      params: undefined,
      attributes: {
        type: 'text/javascript',
        'data-custom-attr': 'custom-attribute-value',
        'mock-attr-key': 'mock-attr-value',
      },
    });
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(jsDomElement.src).toEqual(SCRIPT_LOAD_URL);
    expect(jsDomElement.type).toEqual('text/javascript');
    expect(jsDomElement.getAttribute('data-custom-attr')).toEqual(
      'custom-attribute-value'
    );
    expect(jsDomElement.getAttribute('mock-attr-key')).toEqual(
      'mock-attr-value'
    );
  });

  it('should be able to add script in body element', () => {
    vi.spyOn(documentMock, 'createElement').mockReturnValue(jsDomElement);
    vi.spyOn(documentMock.body, 'appendChild');

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
    vi.spyOn(documentMock, 'createElement').mockReturnValue(jsDomElement);

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
    vi.spyOn(documentMock, 'createElement').mockReturnValue(jsDomElement);
    scriptLoader.embedScript({
      src: SCRIPT_LOAD_URL,
      params: undefined,
      attributes: undefined,
    });

    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(documentMock.createElement).toHaveBeenCalledTimes(1);
  });
});
