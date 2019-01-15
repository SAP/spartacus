import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-app',
  template: '<cx-storefront></cx-storefront>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
