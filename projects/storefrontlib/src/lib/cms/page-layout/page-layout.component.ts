import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { PageLayoutService } from './page-layout.service';
import { tap, map, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent implements OnInit {
  @Input() section: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private pageLayoutService: PageLayoutService
  ) {}

  ngOnInit() {
    if (this.section) {
      this.styleClass = this.section;
    }
  }

  get slots$() {
    return this.pageLayoutService.getSlots(this.section);
  }

  get pageTitle$() {
    return this.pageLayoutService.pageTitle$;
  }

  get templateName$() {
    return this.pageLayoutService.templateName$.pipe(
      // intercept the observable to keep a clean DOM tree
      tap(name => {
        this.styleClass = name;
      })
    );
  }

  set styleClass(cls: string) {
    this.renderer.addClass(this.el.nativeElement, cls);
  }
}
