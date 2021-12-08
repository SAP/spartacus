import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsService, CMSTabParagraphContainer } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import { BREAKPOINT } from '../../../layout/config/layout-config';
import { Tab, TabConfig } from '../tab/Tab';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent {
  tabConfig: TabConfig = {
    openTabs: [0],
    breakpoint: BREAKPOINT.md,
  };

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    protected cmsService: CmsService
  ) {}

  components$: Observable<any[]> = this.componentData.data$.pipe(
    distinctUntilChanged((x, y) => x?.components === y?.components),
    switchMap((data) =>
      combineLatest(
        (data?.components ?? '').split(' ').map((component) =>
          this.cmsService.getComponentData<any>(component).pipe(
            distinctUntilChanged(),
            map((tab) => {
              console.log(data);

              if (!tab) {
                return undefined;
              }

              if (!tab.flexType) {
                tab = {
                  ...tab,
                  flexType: tab.typeCode,
                };
              }

              this.tabConfig = {
                label: <string>data.name,
                openTabs: [0],
                breakpoint: BREAKPOINT.md,
              };

              return {
                ...tab,
                title: `${data.uid}.tabs.${tab.uid}`,
              };
            })
          )
        )
      )
    )
  );

  tabs$: Observable<Tab[]> = this.components$.pipe(
    map((components) =>
      components.map((component) => ({
        headerKey: component.title,
        content: component,
      }))
    )
  );
}
