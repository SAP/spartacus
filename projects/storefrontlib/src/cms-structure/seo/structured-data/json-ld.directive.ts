import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JsonLdScriptFactory } from './json-ld-script.factory';

/**
 * Low level directive that adds a json-ld script tag to the component.
 * This code bypasses the strict XSS security, as otherwise we're not able
 * to append a script tag with JS inside.
 */
@Directive({
  selector: '[cxJsonLd]',
})
export class JsonLdDirective {
  @Input() set cxJsonLd(schema: string | number) {
    this.writeJsonLd(schema);
  }

  @HostBinding('innerHTML') jsonLD: SafeHtml;

  constructor(
    protected jsonLdScriptFactory: JsonLdScriptFactory,
    protected sanitizer: DomSanitizer
  ) {}

  private writeJsonLd(schema: {}) {
    if (schema && this.jsonLdScriptFactory.isJsonLdRequired()) {
      const sanitizedSchema = this.jsonLdScriptFactory.sanitize(schema);
      const html = `<script type="application/ld+json">${sanitizedSchema}</script>`;
      this.jsonLD = this.sanitizer.bypassSecurityTrustHtml(html);
    }
  }
}
