import { TestBed, inject } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

import {
  GlobalMessageService,
  GlobalMessageType,
  WindowRef
} from '@spartacus/core';
import { AddToHomeScreenService } from './add-to-home-screen.service';
import { PWAModuleConfig } from '../pwa.module-config';

class MockGlobalMessageService {
  add = createSpy();
}

const MockPWaModuleConfig: PWAModuleConfig = {
  pwa: {
    enabled: true,
    addToHomeScreen: true
  }
};
describe('AddToHomeScreenService', () => {
  let addToHomeService: AddToHomeScreenService;
  let globalMessageService: GlobalMessageService;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddToHomeScreenService,
        WindowRef,
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: PWAModuleConfig, useValue: MockPWaModuleConfig }
      ]
    });

    addToHomeService = TestBed.get(AddToHomeScreenService);
    winRef = TestBed.get(WindowRef);
    globalMessageService = TestBed.get(GlobalMessageService);
  });

  it('should inject AddToHomeScreenService', inject(
    [AddToHomeScreenService],
    (service: AddToHomeScreenService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should enableAddToHomeScreen after beforeinstallprompt is fired', () => {
    spyOn(addToHomeService, 'enableAddToHomeScreen').and.stub();

    const event = new Event('beforeinstallprompt');
    winRef.nativeWindow.dispatchEvent(event);
    expect(addToHomeService.enableAddToHomeScreen).toHaveBeenCalled();
  });

  it('should disableAddToHomeScreen after appinstalled is fired', () => {
    spyOn(addToHomeService, 'disableAddToHomeScreen').and.stub();

    const event = new Event('appinstalled');
    winRef.nativeWindow.dispatchEvent(event);
    expect(addToHomeService.disableAddToHomeScreen).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith({
      type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      text: 'SAP Storefront was added to your home screen'
    });
  });

  it('should enableAddToHomeScreen make canPrompt true', () => {
    let canPrompt: boolean;
    addToHomeService.canPrompt$.subscribe(value => (canPrompt = value));
    addToHomeService.enableAddToHomeScreen();
    expect(canPrompt).toBeTruthy();
  });

  it('should disableAddToHomeScreen make canPrompt false', () => {
    let canPrompt: boolean;
    addToHomeService.canPrompt$.subscribe(value => (canPrompt = value));
    addToHomeService.disableAddToHomeScreen();
    expect(canPrompt).toBeFalsy();
  });
});
