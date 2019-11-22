import {
  ChangeDetectionStrategy,
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CmsService, CMSTabParagraphContainer } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent implements AfterViewInit {
  activeTabNum = 0;

  @ViewChildren(ComponentWrapperDirective) children!: QueryList<
    ComponentWrapperDirective
  >;

  tabTitleParams: Observable<any>[] = [];

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    private cmsService: CmsService
  ) {}

  components$: Observable<any[]> = this.componentData.data$.pipe(
    switchMap(data =>
      combineLatest(
        data.components.split(' ').map(component =>
          this.cmsService.getComponentData<any>(component).pipe(
            map(tab => {
              if (!tab.flexType) {
                tab = {
                  ...tab,
                  flexType: tab.typeCode,
                };
              }

              return {
                ...tab,
                title: `${this.componentData.uid}.tabs.${tab.uid}`,
              };
            })
          )
        )
      )
    )
  );

  select(tabNum: number): void {
    this.activeTabNum = tabNum;
  }

  ngAfterViewInit() {
    this.children.changes.subscribe(
      (tabComps: QueryList<ComponentWrapperDirective>) => {
        tabComps.forEach(comp => {
          if (comp.cmpRef.instance.tabTitleParam$) {
            this.tabTitleParams.push(comp.cmpRef.instance.tabTitleParam$);
          } else {
            this.tabTitleParams.push(null);
          }
        });
      }
    );
  }
}
