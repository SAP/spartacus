import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { ImageFetchPriority } from '../components/media/media.model';
import { LcpContextDirective } from './lcp-context.directive';
import { LcpPresenceMappingService } from './lcp-presence-mapping.service';
import { LcpPresence } from './lcp-presence.model';
import { LCP_PRESENCE } from './lcp-presence.token';

class MockLcpPresenceMappingService {
  getFetchPriority(lcpPresence: LcpPresence): ImageFetchPriority | undefined {
    return lcpPresence === LcpPresence.HAS_LCP
      ? ImageFetchPriority.HIGH
      : undefined;
  }
}

@Component({
  selector: 'cx-test-host',
  template: `
    <ng-container *cxLcpContext="let lcpContext">
      <div class="test-lcpPresence">
        {{ lcpContext.lcpPresence$ | async }}
      </div>
      <div class="test-fetchPriority">
        {{ lcpContext.fetchPriority$ | async }}
      </div>
    </ng-container>
  `,
  imports: [LcpContextDirective, AsyncPipe],
})
class TestHostComponent {}

describe('LcpContextDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let mockLcpPresence$: ReplaySubject<LcpPresence>;

  beforeEach(() => {
    mockLcpPresence$ = new ReplaySubject<LcpPresence>();
    TestBed.configureTestingModule({
      imports: [TestHostComponent, LcpContextDirective],
      providers: [
        {
          provide: LCP_PRESENCE,
          useValue: mockLcpPresence$,
        },
        {
          provide: LcpPresenceMappingService,
          useClass: MockLcpPresenceMappingService,
        },
      ],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should expose lcpPresence$ with HAS_LCP in the template context', () => {
    mockLcpPresence$.next(LcpPresence.HAS_LCP);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.test-lcpPresence'));
    expect(el.nativeElement.textContent.trim()).toBe(LcpPresence.HAS_LCP);
  });

  it('should expose lcpPresence$ with NO_LCP in the template context', () => {
    mockLcpPresence$.next(LcpPresence.NO_LCP);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.test-lcpPresence'));
    expect(el.nativeElement.textContent.trim()).toBe(LcpPresence.NO_LCP);
  });

  it('should expose fetchPriority$ mapped from lcpPresence$ with HAS_LCP', () => {
    mockLcpPresence$.next(LcpPresence.HAS_LCP);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.test-fetchPriority'));
    expect(el.nativeElement.textContent.trim()).toBe(ImageFetchPriority.HIGH);
  });

  it('should expose fetchPriority$ mapped from lcpPresence$ with NO_LCP', () => {
    mockLcpPresence$.next(LcpPresence.NO_LCP);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.test-fetchPriority'));
    expect(el.nativeElement.textContent.trim()).toBe('');
  });
});
