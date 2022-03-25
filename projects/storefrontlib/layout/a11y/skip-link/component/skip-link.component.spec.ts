import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { SkipLink, SkipLinkConfig } from '../config/index';
import { SkipLinkService } from '../service/skip-link.service';
import { SkipLinkComponent } from './skip-link.component';

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

@Directive({
  selector: '[cxFocus]',
})
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [SkipLinkComponent, MockFocusDirective],
        providers: [
          {
            provide: SkipLinkConfig,
            useValue: { skipLinks: [mockSkipLinks] },
          },
          { provide: SkipLinkService, useClass: MockSkipLinkService },
        ],
      }).compileComponents();
    })
  );

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
    expect(buttons[0].outerText).toContain(mockSkipLinks[0].i18nKey);
    expect(buttons[1].outerText).toContain(mockSkipLinks[1].i18nKey);
    expect(buttons[2].outerText).toContain(mockSkipLinks[2].i18nKey);
  });

  it('should call `scrollToTarget` on each button click', () => {
    const spyComponent = spyOn(skipLinkComponent, 'scrollToTarget');
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
