import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsService, CMSTabParagraphContainer } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/index';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent {
  activeTabNum = 0;

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    private cmsService: CmsService
  ) {}

  components$: Observable<any[]> = this.componentData.data$.pipe(
    switchMap(data =>
      this.cmsService.getComponentsData(data.components.split(' '))
    ),
    map(componentsData =>
      componentsData.map((tab: any) => {
        if (!tab.flexType) {
          tab = {
            ...tab,
            flexType: tab.typeCode,
          };
        }
        return {
          ...tab,
          title: `CMSTabParagraphContainer.tabs.${tab.uid}`,
        };
      })
    )
  );

  select(tabNum: number): void {
    this.activeTabNum = tabNum;
  }
}
