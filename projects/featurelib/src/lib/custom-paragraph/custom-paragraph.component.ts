import { Component, OnInit } from '@angular/core';
import { AbstractCmsComponent } from 'storefrontlib';

@Component({
  selector: 'lib-custom-paragraph',
  templateUrl: './custom-paragraph.component.html',
  styleUrls: ['./custom-paragraph.component.css']
})
export class CustomParagraphComponent extends AbstractCmsComponent {
  static componentName = 'CustomParagraphComponent';
  paragraphData: string;

  protected fetchData() {
    if (this.component && this.component.content) {
      this.paragraphData = this.component.content;
    }
    super.fetchData();
  }
}
