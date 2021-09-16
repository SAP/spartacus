import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JsonLdScriptFactory } from './json-ld-script.factory';

/**
 * Low level directive that adds a json-ld script tag to the component.
 * This code bypasses the strict XSS security, as otherwise we're not able
 * to append a script tag with JS inside.
 *
 * This helper directive is actually not used in Spartacus, as Spartacus
 * appends json-ld the data to the document body.
 *
 * This directive can however be used by merchants to write static schema data
 * to the DOM in a save way.
 */
@Directive({
  selector: '[cxJsonLd]',
})
export class JsonLdDirective {
  /**
   * Writes the schema data to a json-ld script element.
   */
  @Input() set cxJsonLd(schema: string | {}) {
    this.jsonLD = this.generateJsonLdScript(schema);
  }

  @HostBinding('innerHTML') jsonLD: SafeHtml;

  constructor(
    protected jsonLdScriptFactory: JsonLdScriptFactory,
    protected sanitizer: DomSanitizer
  ) {}

  /**
   * Returns the json-ld script tag with the schema data. The script is
   * _bypassing_ sanitization explicitly.
   */
  protected generateJsonLdScript(schema: string | {}): SafeHtml {
    if (schema && this.jsonLdScriptFactory.isJsonLdRequired()) {
      const sanitizedSchema = this.jsonLdScriptFactory.sanitize(schema);
      const html = `<script type="application/ld+json">${sanitizedSchema}</script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
  }
}
