import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OpfResourceLoaderService } from '@spartacus/opf/base/root';
import { OpfDynamicScript } from '../../root/model';

@Component({
  selector: 'cx-opf-cta-button',
  templateUrl: './opf-cta-button.component.html',
})
export class OpfCtaButtonComponent implements OnInit, AfterViewInit {
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected sanitizer = inject(DomSanitizer);
  //  _ctaScript$: Observable<string | undefined>;
  // ready$ = new BehaviorSubject(false);

  @Input() ctaScriptHtml: string;

  htmlSnippet?: string;

  constructor() {
    console.log('constructor');
    // this.renderCtaScripts(this.ctaScript).then(() => {
    //   this.ready = true;
    // });
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy Button', this.ctaScriptHtml);
  }

  ngAfterViewInit(): void {
    console.log('after view init');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    // this.renderCtaScripts(this.ctaScript)
    //   .then(() => {
    //     this.ready$.next(true);
    //   })
    //   .catch((error) => console.log('error render', error));
    // this.renderCtaScripts(this.ctaScript).then((htmlSnippet) => {
    //   this.htmlSnippet = htmlSnippet;
    // });
    // this._ctaScript$ = this.ctaScript$.pipe(
    //   tap((script) => {
    //     console.log();
    //     return this.renderCtaScripts(script);
    //   }),
    //   concatMap((script) => of(script.html))
    // );
  }

  renderHtml(html?: string): SafeHtml {
    // const trustedHtml = this.sanitizer.bypassSecurityTrustHtml(html as string);
    // console.log('trustedHtml', trustedHtml);
    console.log('renderHtml', html);

    return html as string;
  }

  renderCtaScripts(script: OpfDynamicScript): Promise<string | undefined> {
    const html = script?.html;
    console.log('renderCtaScripts:', html);
    return new Promise((resolve: (value: string | undefined) => void) => {
      this.opfResourceLoaderService
        .loadProviderResources(script.jsUrls, script.cssUrls)
        .then(() => {
          if (html) {
            setTimeout(() => {
              console.log('flo ok:', html);
              this.opfResourceLoaderService.executeScriptFromHtml(html);
              resolve(html);
            });
          } else {
            console.log('flo ko:', html);
            resolve(undefined);
          }
        })
        .catch(() => {
          console.log('flo error:');
          resolve(undefined);
        });
    });
  }
}
