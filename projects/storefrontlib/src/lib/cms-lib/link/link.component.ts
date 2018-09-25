import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';

@Component({
  selector: 'y-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent extends AbstractCmsComponent {}
