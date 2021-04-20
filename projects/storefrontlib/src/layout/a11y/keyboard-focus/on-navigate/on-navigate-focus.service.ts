import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { KeyboardFocusConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class OnNavigateFocusService {
  constructor(
    protected config: KeyboardFocusConfig,
    protected router: Router,
    @Inject(DOCUMENT) protected document: any
  ) {}

  enableResetFocusOnNavigate(): void {
    if (this.config?.keyboardFocus?.enableResetFocusOnNavigate) {
      this.router.events
        .pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
        .subscribe(() => {
          this.document.getElementsByTagName('cx-storefront')[0].focus();
        });
    }
  }
}
