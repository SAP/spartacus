import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Low level component that adds a json-ld script tag to the component.
 * this code bypasses the strict XSS security, as otherwise we're not able
 * to append a script tag with JS inside.
 */
@Component({
  selector: 'cx-json-ld',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonLdComponent {
  @Input()
  set schema(value: {}) {
    this.jsonLD = this.getSafeHTML(value);
  }

  @HostBinding('innerHTML') jsonLD: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  private getSafeHTML(value: {}) {
    const html = `<script type="application/ld+json">${JSON.stringify(
      value
    )}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
