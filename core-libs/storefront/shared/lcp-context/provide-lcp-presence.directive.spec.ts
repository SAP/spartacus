import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LcpPresence } from './lcp-presence.model';
import { DEFAULT_LCP_PRESENCE, LCP_PRESENCE } from './lcp-presence.token';
import { ProvideLcpPresenceDirective } from './provide-lcp-presence.directive';

@Component({
  selector: 'cx-child',
  template: `Child:
    <div class="lcpPresence">
      {{ lcpPresence$ | async }}
    </div>`,
  imports: [AsyncPipe],
})
class ChildComponent {
  lcpPresence$ = inject(LCP_PRESENCE);
}

@Component({
  selector: 'cx-test-host',
  template: `Parent:
    <div [cxProvideLcpPresence]="lcpPresence">
      <cx-child></cx-child>
    </div>`,
  imports: [ProvideLcpPresenceDirective, ChildComponent],
})
class TestHostComponent {
  lcpPresence: LcpPresence = LcpPresence.HAS_LCP;
}

describe('ProvideLcpContextDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(TestHostComponent);
  });

  function getInjectedLcpPresence(): string {
    return fixture.debugElement
      .query(By.css('.lcpPresence'))
      .nativeElement.textContent.trim();
  }

  it('should provide something, but not fallback to DEFAULT_LCP_PRESENCE', () => {
    fixture.detectChanges();
    const child = fixture.debugElement.query(By.directive(ChildComponent));
    expect(child.componentInstance.lcpPresence$).toBeTruthy();
    expect(child.componentInstance.lcpPresence$).not.toBe(DEFAULT_LCP_PRESENCE);
  });

  it('should provide default NO_LCP when input is null', () => {
    fixture.detectChanges();
    const injectedLcpPresence = getInjectedLcpPresence();
    expect(injectedLcpPresence).toBe(LcpPresence.HAS_LCP);
  });

  it('should provide the input value when set', () => {
    fixture.componentInstance.lcpPresence = LcpPresence.NO_LCP;
    fixture.detectChanges();
    const injectedLcpPresence = getInjectedLcpPresence();
    expect(injectedLcpPresence).toBe(LcpPresence.NO_LCP);
  });

  it('should return NO_LCP from getInjectedLcpPresence when the value is set to NO_LCP', () => {
    fixture.componentInstance.lcpPresence = LcpPresence.NO_LCP;
    fixture.detectChanges();
    const injectedLcpPresence = getInjectedLcpPresence();
    expect(injectedLcpPresence).toBe(LcpPresence.NO_LCP);
  });

  it('should return HAS_LCP from getInjectedLcpPresence when the value is set to HAS_LCP', () => {
    fixture.componentInstance.lcpPresence = LcpPresence.HAS_LCP;
    fixture.detectChanges();
    const injectedLcpPresence = getInjectedLcpPresence();
    expect(injectedLcpPresence).toBe(LcpPresence.HAS_LCP);
  });
});
