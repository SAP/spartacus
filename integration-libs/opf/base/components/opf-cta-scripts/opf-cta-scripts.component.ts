import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OpfResourceLoaderService } from '@spartacus/opf/base/root';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-scripts',
  templateUrl: './opf-cta-scripts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaScriptsComponent {
  protected opfCtaScriptService = inject(OpfCtaScriptsService);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);

  ctaHtmlList$ = this.opfCtaScriptService.getCtaHtmlslList();
}
