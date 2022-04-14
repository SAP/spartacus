import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent {
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    if (this.router && event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      const href = element?.getAttribute('href');

      // Use router for internal link navigation
      if (href?.indexOf('/') === 0) {
        event.preventDefault();
        this.router.navigate([`/${href}`]);
      }
    }
  }

  /**
   * @deprecated since version 5.0
   * Use the following constructor instead:
   * ```
   * constructor(
   *   public component: CmsComponentData<CmsParagraphComponent>,
   *   protected router: Router
   * ) {}
   * ```
   */
  constructor(component: CmsComponentData<CmsParagraphComponent>);
  constructor(
    public component: CmsComponentData<CmsParagraphComponent>,
    protected router?: Router
  ) {}
}
