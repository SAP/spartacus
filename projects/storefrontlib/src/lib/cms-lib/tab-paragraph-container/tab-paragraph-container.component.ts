import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { AbstractProductComponent } from '../abstract-product-component';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  styleUrls: ['./tab-paragraph-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabParagraphContainerComponent {
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
