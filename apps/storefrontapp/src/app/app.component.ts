import { Component, signal } from '@angular/core';
import { StorefrontComponent } from '@spartacus/storefront';

@Component({
  selector: 'app-root',
  imports: [StorefrontComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('spartacus-test-for-bill');
}
