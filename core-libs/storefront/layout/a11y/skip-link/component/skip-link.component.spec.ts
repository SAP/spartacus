import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { FocusDirective } from '../../keyboard-focus/focus.directive';
import { SkipLink, SkipLinkConfig } from '../config/index';
import { SkipLinkService } from '../service/skip-link.service';
import { SkipLinkComponent } from './skip-link.component';
import { vi } from 'vitest';

const mockSkipLinks: SkipLink[] = [
  {
    target: undefined,
    position: undefined,
    i18nKey: 'Link 1',
    key: 'Key1',
  },
  {
    target: undefined,
    position: undefined,
    i18nKey: 'Link 2',
    key: 'Key2',
  },
  {
    target: undefined,
    position: undefined,
    i18nKey: 'Link 3',
    key: 'Key3',
  },
];

@Directive({ selector: '[cxFocus]' })
export class MockFocusDirective {
  @Input('cxFocus') protected config;
}

class MockSkipLinkService {
  getSkipLinks = () => {
    return new BehaviorSubject(mockSkipLinks);
  };
}

describe('SkipLinkComponent', () => {
  let skipLinkComponent: SkipLinkComponent;
  let fixture: ComponentFixture<SkipLinkComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SkipLinkComponent],
      providers: [
        {
          provide: SkipLinkConfig,
          useValue: { skipLinks: [mockSkipLinks] },
        },
        { provide: SkipLinkService, useClass: MockSkipLinkService },
      ],
    })
      .overrideComponent(SkipLinkComponent, {
        remove: { imports: [TranslatePipe, FocusDirective] },
        add: { imports: [MockTranslatePipe, MockFocusDirective] },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SkipLinkComponent);
    skipLinkComponent = fixture.componentInstance;

    fixture.detectChanges(); // run async pipe on skipLinks$
    await fixture.whenStable(); // wait for async emmision of skipLinks$
    fixture.detectChanges(); // consume emitted value
  });

  it('should be created', () => {
    expect(skipLinkComponent).toBeTruthy();
  });

  it('should render skip links', () => {
    const element = fixture.debugElement.nativeElement;
    const buttons = element.querySelectorAll('button');
    expect(buttons.length).toEqual(3);
    expect(buttons[0].textContent).toContain(mockSkipLinks[0].i18nKey);
    expect(buttons[1].textContent).toContain(mockSkipLinks[1].i18nKey);
    expect(buttons[2].textContent).toContain(mockSkipLinks[2].i18nKey);
  });

  it('should call `scrollToTarget` on each button click', () => {
    const spyComponent = vi
      .spyOn(skipLinkComponent, 'scrollToTarget')
      .mockImplementation(() => {});
    const element = fixture.debugElement.nativeElement;
    const buttons = element.querySelectorAll('button');

    expect(buttons.length).toEqual(3);
    expect(spyComponent).not.toHaveBeenCalled();

    buttons[0].click();
    buttons[1].click();
    buttons[2].click();

    expect(spyComponent).toHaveBeenCalledWith(mockSkipLinks[0]);
    expect(spyComponent).toHaveBeenCalledWith(mockSkipLinks[1]);
    expect(spyComponent).toHaveBeenCalledWith(mockSkipLinks[2]);
    expect(spyComponent).toHaveBeenCalledTimes(3);
  });
});
