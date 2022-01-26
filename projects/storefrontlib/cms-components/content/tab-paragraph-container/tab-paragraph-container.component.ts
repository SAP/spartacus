import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  CmsService,
  CMSTabParagraphContainer,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
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
export class TabParagraphContainerComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  activeTabNum = 0;

  @ViewChildren(ComponentWrapperDirective)
  children!: QueryList<ComponentWrapperDirective>;

  tabTitleParams: (Observable<any> | null)[] = [];

  // TODO: it is not used any more, so can be removed in 5.0
  subscription: Subscription;

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    protected cmsService: CmsService,
    protected winRef: WindowRef,
    protected breakpointService: BreakpointService
  ) {}

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

  select(tabNum: number, event?: MouseEvent): void {
    this.breakpointService
      ?.isDown(BREAKPOINT.sm)
      .pipe(take(1))
      .subscribe((res) => {
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

  ngOnInit(): void {
    this.activeTabNum =
      this.winRef?.nativeWindow?.history?.state?.activeTab ?? this.activeTabNum;
  }

  ngAfterViewInit(): void {
    // If the sub cms components data exist, the components created before ngAfterViewInit are called.
    // In this case, the title parameters are directly pulled from them.
    if (this.children.length > 0) {
      this.getTitleParams(this.children);
    }
  }

  tabCompLoaded(componentRef: any): void {
    this.tabTitleParams.push(componentRef.instance.tabTitleParam$);
  }

  private getTitleParams(children: QueryList<ComponentWrapperDirective>) {
    children.forEach((comp) => {
      if (comp.cmpRef?.instance.tabTitleParam$) {
        this.tabTitleParams.push(comp.cmpRef.instance.tabTitleParam$);
      } else {
        this.tabTitleParams.push(null);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
