import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CMSTabParagraphContainer,
  CmsService,
  WindowRef,
} from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent {
  activatedElements: HTMLElement[] = [];

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    private cmsService: CmsService,
    private windowRef: WindowRef
  ) {}

  components$ = this.componentData.data$.pipe(
    map((data: CMSTabParagraphContainer) => {
      return data.components.split(' ').map(component =>
        this.cmsService.getComponentData<any>(component).pipe(
          map(tab => {
            if (!tab.flexType) {
              tab.flexType = tab.typeCode;
            }
            return { ...tab, title: `productTabs.${tab.uid}` };
          })
        )
      );
    }),
    take(1)
  );

  select(event: MouseEvent, tab: HTMLElement): void {
    if (this.activatedElements.length === 0) {
      const activeElements = this.windowRef.document.querySelectorAll(
        'cx-tab-paragraph-container .active'
      );
      activeElements.forEach((node: Element) =>
        node.classList.remove('active')
      );
    }

    if (!this.activatedElements.includes(tab)) {
      // remove active class on both header and content panel
      this.activatedElements.forEach(el =>
        el.classList.remove('active', 'toggled')
      );
      this.activatedElements = [<HTMLElement>event.target, tab];
      this.activatedElements.forEach(el => el.classList.add('active'));
    } else {
      this.activatedElements.forEach(el => el.classList.toggle('toggled'));
    }
  }
}
