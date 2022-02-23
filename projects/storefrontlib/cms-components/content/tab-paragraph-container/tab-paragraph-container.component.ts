import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  CmsService,
  CMSTabParagraphContainer,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../layout/config/layout-config';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent implements AfterViewInit, OnInit {
  activeTabNum = 0;

  @ViewChildren(ComponentWrapperDirective)
  children!: QueryList<ComponentWrapperDirective>;

  tabTitleParams: (Observable<any> | null)[] = [];

  // TODO: move definition to separate function and initialize components$ in OnInit hook
  components$: Observable<any[]> = this.componentData.data$.pipe(
    distinctUntilChanged((x, y) => x?.components === y?.components),
    switchMap((data) =>
      combineLatest(
        (data?.components ?? '').split(' ').map((component) =>
          this.cmsService.getComponentData<any>(component).pipe(
            distinctUntilChanged(),
            map((tab) => {
              if (!tab) {
                return undefined;
              }

              if (!tab.flexType) {
                tab = {
                  ...tab,
                  flexType: tab.typeCode,
                };
              }

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

  isMobile$: Observable<boolean>;

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    protected cmsService: CmsService,
    protected winRef: WindowRef,
    protected breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.activeTabNum =
      this.winRef?.nativeWindow?.history?.state?.activeTab ?? this.activeTabNum;

    this.isMobile$ = this.breakpointService.isDown(BREAKPOINT.sm);
  }

  ngAfterViewInit(): void {
    // If the sub cms components data exist, the components created before ngAfterViewInit are called.
    // In this case, the title parameters are directly pulled from them.
    if (this.children.length > 0) {
      this.getTitleParams(this.children);
    }
  }

  select(tabNum: number, event?: MouseEvent): void {
    this.isMobile$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.activeTabNum = this.activeTabNum === tabNum ? -1 : tabNum;
        if (event && event?.target) {
          const target = event.target as HTMLElement;
          const parentNode = target.parentNode as HTMLElement;
          this.winRef?.nativeWindow?.scrollTo(0, parentNode.offsetTop);
        }
      } else {
        this.activeTabNum = tabNum;
      }
    });
  }

  tabCompLoaded(componentRef: any): void {
    this.tabTitleParams.push(componentRef.instance.tabTitleParam$);
  }

  // TODO: refactor deprecated code
  private getTitleParams(children: QueryList<ComponentWrapperDirective>) {
    children.forEach((comp) => {
      if (comp.cmpRef?.instance.tabTitleParam$) {
        this.tabTitleParams.push(comp.cmpRef.instance.tabTitleParam$);
      } else {
        this.tabTitleParams.push(null);
      }
    });
  }
}
