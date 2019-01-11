import { TestBed } from '@angular/core/testing';

import { WindowRef } from './window-ref';

describe('WindowRef service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowRef = TestBed.get(WindowRef);
    expect(service).toBeTruthy();
  });

  it('should expose window as natiweWindow', () => {
    const service: WindowRef = TestBed.get(WindowRef);
    expect(service.nativeWindow).toEqual(window);
  });

  it('should expose document', () => {
    const service: WindowRef = TestBed.get(WindowRef);
    expect(service.document).toEqual(document);
  });

  it('should expose sessionStorage', () => {
    const service: WindowRef = TestBed.get(WindowRef);
    expect(service.sessionStorage).toEqual(sessionStorage);
  });

  it('should expose document', () => {
    const service: WindowRef = TestBed.get(WindowRef);
    expect(service.localStorage).toEqual(localStorage);
  });
});
