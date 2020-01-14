import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { TestOutletService } from './test-outlets/test-outlet.service';

const TEST_MODE_ENABLED_LOCAL_STORAGE_KEY = 'test_mode_enabled';

@Injectable({
  providedIn: 'root',
})
export class TestModeEnablerService {
  constructor(
    protected location: Location,
    protected winRef: WindowRef,
    protected testOutletService: TestOutletService
  ) {}

  initialize(): void {
    if (this.shouldBeDisabled()) {
      this.removeFromStorage();
    } else if (this.shouldBeEnabled()) {
      this.testOutletService.initialize();
    }
  }

  private shouldBeEnabled(): boolean {
    if (this.isInitialized() && !this.isSavedInStorage()) {
      this.saveToStorage();
    }
    return this.isInitialized() || this.isSavedInStorage();
  }

  private saveToStorage(): void {
    if (this.winRef.localStorage) {
      this.winRef.localStorage.setItem(
        TEST_MODE_ENABLED_LOCAL_STORAGE_KEY,
        `true`
      );
    }
  }

  private removeFromStorage(): void {
    if (this.winRef.localStorage) {
      this.winRef.localStorage.removeItem(TEST_MODE_ENABLED_LOCAL_STORAGE_KEY);
    }
  }

  private isTestQueryParam(value: boolean) {
    const params = this.location.path().split('?')[1];
    return params && params.split('&').includes(`test=${value}`);
  }

  private shouldBeDisabled(): boolean {
    return this.isTestQueryParam(false);
  }

  private isInitialized(): boolean {
    return this.isTestQueryParam(true);
  }

  private isSavedInStorage(): boolean {
    return (
      this.winRef.localStorage &&
      this.winRef.localStorage.getItem(TEST_MODE_ENABLED_LOCAL_STORAGE_KEY) ===
        'true'
    );
  }
}
