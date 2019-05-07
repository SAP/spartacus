import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PageLayoutService } from './page-layout.service';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent implements OnInit {
  @Input() section: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private pageLayoutService: PageLayoutService
  ) {}

  ngOnInit(): void {
    if (this.section) {
      this.styleClass = this.section;
    }
  }

  get slots$(): Observable<string[]> {
    return this.pageLayoutService.getSlots(this.section);
  }

  get templateName$(): Observable<string> {
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
