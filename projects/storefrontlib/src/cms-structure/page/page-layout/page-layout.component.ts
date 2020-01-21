import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { PageLayoutService } from './page-layout.service';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  @Input() set section(value: string) {
    this.section$.next(value);
  }
  readonly section$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  readonly templateName$: Observable<string> = this.pageLayoutService
    .templateName$;

  readonly layoutName$: Observable<string> = this.section$.pipe(
    switchMap(section => (section ? of(section) : this.templateName$)),
    tap(name => {
      this.styleClass = name;
    })
  );

  readonly slots$: Observable<string[]> = this.section$.pipe(
    switchMap(section => this.pageLayoutService.getSlots(section))
  );

  readonly pageFoldSlot$: Observable<string> = this.templateName$.pipe(
    switchMap(templateName =>
      this.pageLayoutService.getPageFoldSlot(templateName)
    ),
    distinctUntilChanged()
  );

  private currentClass;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private pageLayoutService: PageLayoutService
  ) {}

  set styleClass(cls: string) {
    if (this.currentClass) {
      this.renderer.removeClass(this.el.nativeElement, this.currentClass);
    }
    this.renderer.addClass(this.el.nativeElement, cls);
    this.currentClass = cls;
  }
}
