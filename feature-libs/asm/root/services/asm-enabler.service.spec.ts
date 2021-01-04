import { Location } from '@angular/common';
import { ComponentFactoryResolver } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import {
  LaunchDialogService,
  LayoutConfig,
  OutletService,
} from '@spartacus/storefront';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';
import { AsmEnablerService } from './asm-enabler.service';

const store = {};
const MockWindowRef = {
  localStorage: {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string): void => {
      if (key in store) {
        delete store[key];
      }
    },
  },
};

class MockComponentFactoryResolver {
  resolveComponentFactory() {}
}

class MockOutletService {
  add() {}
}

class MockLocation {
  path() {
    return '';
  }
}

class MockLaunchDialogService {
  launch() {}
}

const mockLaunchConfig: LayoutConfig = {
  launch: {
    ASM: {
      outlet: 'cx-outlet-test',
      component: {},
    },
  },
};

describe('AsmEnablerService', () => {
  let asmEnablerService: AsmEnablerService;
  let windowRef: WindowRef;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useValue: MockWindowRef },
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
        { provide: OutletService, useClass: MockOutletService },
        { provide: Location, useClass: MockLocation },
        { provide: LayoutConfig, useValue: mockLaunchConfig },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
    });

    asmEnablerService = TestBed.inject(AsmEnablerService);
    windowRef = TestBed.inject(WindowRef);
    location = TestBed.inject(Location);

    windowRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
  });

  it('should be created', () => {
    expect(asmEnablerService).toBeTruthy();
  });

  describe('Open ASM based on URL parameter', () => {
    it('should add UI when ?asm=true', () => {
      spyOn(location, 'path').and.returnValue('/any/url?asm=true');
      spyOn(<any>asmEnablerService, 'addUi').and.stub();
      asmEnablerService.load();
      expect((<any>asmEnablerService).addUi).toHaveBeenCalled();
    });

    it('should not add UI when asm param is not used', () => {
      spyOn(location, 'path').and.returnValue('/any/url');
      spyOn(<any>asmEnablerService, 'addUi').and.stub();
      asmEnablerService.load();
      expect((<any>asmEnablerService).addUi).not.toHaveBeenCalled();
    });
  });

  describe('Open ASM based on previous usage', () => {
    it('should add UI when localStorage key asm_enabled is true', () => {
      windowRef.localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'true');
      spyOn(location, 'path').and.returnValue('/any/url');
      spyOn(<any>asmEnablerService, 'addUi').and.stub();
      asmEnablerService.load();
      expect((<any>asmEnablerService).addUi).toHaveBeenCalled();
    });

    it('should not add UI when localStorage asm_enabled is false ', () => {
      windowRef.localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'false');
      spyOn(location, 'path').and.returnValue('/any/url');
      spyOn(<any>asmEnablerService, 'addUi').and.stub();
      asmEnablerService.load();
      expect((<any>asmEnablerService).addUi).not.toHaveBeenCalled();
    });

    it('should not add UI when localStorage asm_enabled is not available ', () => {
      windowRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
      spyOn(location, 'path').and.returnValue('/any/url');
      spyOn(<any>asmEnablerService, 'addUi').and.stub();
      asmEnablerService.load();
      expect((<any>asmEnablerService).addUi).not.toHaveBeenCalled();
    });
  });
});
