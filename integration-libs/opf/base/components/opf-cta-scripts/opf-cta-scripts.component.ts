import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-scripts',
  templateUrl: './opf-cta-scripts.component.html',
})
export class OpfCtaScriptsComponent implements OnInit, OnDestroy {
  protected opfCtaScriptService = inject(OpfCtaScriptsService);
  protected cmsService = inject(CmsService);

  protected sub: Subscription;

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    console.log('ngOnInit');

    // this.cmsService.getCurrentPage().subscribe((cmsPage) => {
    //   console.log('cmsPage', cmsPage);
    // });

    this.sub = this.opfCtaScriptService.getCtaScripts().subscribe({
      next: (ctaScripts) => {
        console.log('ctaScripts', ctaScripts);
      },
      error: (error) => {
        console.log('cta error', error);
      },
    });
  }
}
