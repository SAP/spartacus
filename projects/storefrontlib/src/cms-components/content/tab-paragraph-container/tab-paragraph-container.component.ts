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
// import { AbstractProductComponent } from '../abstract-product-component';

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
  // map(productIds =>
  //   productIds.forEach(component => {
  //     return {
  //       typeCode: component,
  //       flexType: component,
  //       uid: component,
  //     };
  //   })
  // )

  // extends AbstractProductComponent {
  // @ViewChild('tabContent') tabContent: Element;
  // fetchData() {
  //     // console.log(this.contextParameters.tab);
  //     // this.contextParameters.tab.title = new BehaviorSubject<any>({});
  //     // this.contextParameters.tab.title.next('test');
  //     // this.contextParameters.tab.title.complete();
  //     // const s = new AsyncSubject<any>();
  //     // this.occProductSearchService.query(query)
  //     //     .then((pageData) => {
  //     //         s.next(pageData);
  //     //         s.complete();
  //     // });
  //     // return s;
  //     // if (!this.contextParameters.tab) {
  //     //     this.contextParameters.tab = {};
  //     // }
  //     // this.contextParameters.tab.title = this.component.title;
  //     // console.log(this.contextParameters.tab);
  //     // this.cd.detectChanges();
  //     // console.log(this.component.title);
  //     // console.log(this.tabContent);
  //     // console.log(this.contextParameters);
  //     // this.contextParameters);
  // }
  // ngOnInit() {
  //     this.contextParameters.tabTitle.next('test');
  //     this.cd.detectChanges();
  //     // super.fetchData();
  // }
}
