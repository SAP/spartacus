import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'cx-commerce-quotes-table',
  templateUrl: 'commerce-quotes-table.component.html',
  styles: ['table { width: 100%;}'],
})
export class CommerceQuotesTableComponent {
  @Input() data!: Array<any>;
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;
}
