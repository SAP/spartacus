import {
  ChangeDetectionStrategy,
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CMSTabParagraphContainer, CmsService } from '@spartacus/core';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';
import { map, filter, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent implements AfterViewInit {
  activatedElements: HTMLElement[] = [];

  @ViewChildren('header') headers: QueryList<any>;

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    private cmsService: CmsService
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

  ngAfterViewInit(): void {
    if (this.headers.first) {
      this.headers.first.nativeElement.click();
    } else {
      this.headers.changes
        .pipe(
          filter((list: QueryList<any>) => list.first),
          take(1)
        )
        .subscribe((list: QueryList<any>) => {
          list.first.nativeElement.click();
        });
    }
  }

  select(event: MouseEvent, tab: HTMLElement): void {
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
