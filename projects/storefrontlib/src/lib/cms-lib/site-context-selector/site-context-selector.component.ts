import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContext } from '@spartacus/core';

@Component({
  selector: 'cx-site-context-selector',
  templateUrl: './site-context-selector.component.html',
  styleUrls: ['./site-context-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteContextSelectorComponent {
  siteContextService: SiteContext<any>;

  constructor(private componentService: SiteContextComponentService) {}

  get items$(): Observable<any> {
    return this.componentService.items$;
  }

  get activeItem$(): Observable<string> {
    return this.componentService.activeItem$;
  }

  set active(value: string) {
    this.componentService.active = value;
  }

  get label$(): Observable<any> {
    return this.componentService.label$;
  }
}
