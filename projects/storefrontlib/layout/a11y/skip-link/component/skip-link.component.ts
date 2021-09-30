import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { EventService } from 'projects/core/src/event';
import { NavigationEvent } from 'projects/storefrontlib/events';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SkipLink } from '../config/skip-link.config';
import { SkipLinkService } from '../service/skip-link.service';

@Component({
  selector: 'cx-skip-link',
  templateUrl: './skip-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipLinkComponent implements OnInit, OnDestroy {
  protected subscription: Subscription = new Subscription();

  skipLinks$: Observable<SkipLink[]> = this.skipLinkService.getSkipLinks();

  @HostBinding('tabindex') tabindex: string = '-1';

  get host(): HTMLElement | undefined {
    return this.elementRef?.nativeElement;
  }

  constructor(
    skipLinkService: SkipLinkService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    elementRef?: ElementRef<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    eventService?: EventService
  );

  /**
   * @deprecated since 4.2
   * TODO(#13934): Remove deprecated constructors
   */
  constructor(skipLinkService: SkipLinkService);

  constructor(
    private skipLinkService: SkipLinkService,
    @Optional() protected elementRef?: ElementRef<HTMLElement>,
    @Optional() protected eventService?: EventService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.eventService
        ?.get(NavigationEvent)
        .pipe(distinctUntilChanged())
        .subscribe((_) => {
          setTimeout(() => {
            this.host?.focus();
            this.host?.blur();
          });
        })
    );
  }

  scrollToTarget(skipLink: SkipLink): void {
    this.skipLinkService.scrollToTarget(skipLink);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
