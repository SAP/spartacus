import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CMSTabParagraphContainer } from '@spartacus/core';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent {
  activatedElements: HTMLElement[] = [];

  @ViewChild('header')
  set initial(ref: ElementRef) {
    if (ref) {
      ref.nativeElement.click();
    }
  }

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>
  ) {}

  components$: Observable<any> = this.componentData.data$.pipe(
    map((data: CMSTabParagraphContainer) =>
      data.components.split(' ').map(component => {
        if (component === 'deliveryTab') {
          return {
            flexType: 'CMSTabParagraphComponent',
            uid: 'deliveryTab',
          };
        }
        return {
          typeCode: component,
          flexType: component,
          uid: component,
        };
      })
    )
  );

  select(event: MouseEvent, tab: HTMLElement): void {
    if (!this.activatedElements.includes(tab)) {
      // remove active class on both header and content panel
      this.activatedElements.forEach(el =>
        el.classList.remove('active', 'toggled')
      );
      this.activatedElements = [<HTMLElement>event.target, tab];
      this.activatedElements.forEach(el => el.classList.add('active'));
      // only scroll if the element is not yet visible
    } else {
      this.activatedElements.forEach(el => el.classList.toggle('toggled'));
    }
  }

  createHeader(component: any) {
    return `productTabs.${component.uid}`;
  }
}
