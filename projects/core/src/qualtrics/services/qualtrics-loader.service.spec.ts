import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '../../window';
import { QualtricsConfig } from '../config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';

const mockQualtricsConfig: QualtricsConfig = {
  qualtrics: {
    active: true,
  },
};

const mockWindowRef = {
  nativeWindow: {
    QSI: {
      API: {
        unload: (): any => {},
        load: (): any => {},
        run: (): any => {},
      },
    },
  },
};

fdescribe('QualtricsLoaderService', () => {
  let service: QualtricsLoaderService;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: QualtricsConfig, useValue: mockQualtricsConfig },
        { provide: WindowRef, useValue: mockWindowRef },
      ],
    });

    winRef = TestBed.get(WindowRef as Type<WindowRef>);
    service = TestBed.get(QualtricsLoaderService as Type<
      QualtricsLoaderService
    >);
    const qsi = winRef.nativeWindow['QSI'];

    spyOn(qsi.API, 'unload').and.callThrough();
    spyOn(qsi.API, 'load').and.callThrough();
    spyOn(qsi.API, 'run').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have qualtrics enabled', () => {
    expect(qsi).toBeDefined();
  });

  it('should load qualtrics', () => {
    // service.load().subscribe
  });
});
