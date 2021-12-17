import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from './window-ref';

describe('WindowRef service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowRef = TestBed.inject(WindowRef);
    expect(service).toBeTruthy();
  });

  describe('in server', () => {
    let service: WindowRef;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      });
      service = TestBed.inject(WindowRef);
    });

    it('isBrowser should return false', () => {
      expect(service.isBrowser()).toEqual(false);
    });

    it('nativeWindow should be undefined', () => {
      expect(service.nativeWindow).toEqual(undefined);
    });

    it('sessionStorage should be undefined', () => {
      expect(service.sessionStorage).toEqual(undefined);
    });

    it('localStorage should be undefined', () => {
      expect(service.localStorage).toEqual(undefined);
    });

    it('should expose document', () => {
      expect(service.document).toEqual(document);
    });
  });

  describe('in browser', () => {
    let service: WindowRef;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(WindowRef);
    });

    it('isBrowser should return true', () => {
      expect(service.isBrowser()).toEqual(true);
    });

    it('should expose window as nativeWindow', () => {
      expect(service.nativeWindow).toEqual(window);
    });

    it('should expose document', () => {
      expect(service.document).toEqual(document);
    });

    it('should expose sessionStorage', () => {
      expect(service.sessionStorage).toEqual(sessionStorage);
    });

    it('should expose document', () => {
      expect(service.localStorage).toEqual(localStorage);
    });
  });
});
