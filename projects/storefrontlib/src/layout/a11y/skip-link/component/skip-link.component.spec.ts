import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkipLinkComponent } from './skip-link.component';
import { I18nTestingModule } from '@spartacus/core';
import { SkipLinkConfig, SkipLink } from '../config/index';
import { SkipLinkService } from '../service/skip-link.service';
import { BehaviorSubject } from 'rxjs';

const mockSkipLinks: SkipLink[] = [
  {
    target: null,
    position: null,
    i18nKey: 'Link 1',
    key: 'Key1',
  },
  {
    target: null,
    position: null,
    i18nKey: 'Link 2',
    key: 'Key2',
  },
  {
    target: null,
    position: null,
    i18nKey: 'Link 3',
    key: 'Key3',
  },
];

class MockSkipLinkService {
  getSkipLinks = () => {
    return new BehaviorSubject(mockSkipLinks);
  };
}

describe('SkipLinkComponent', () => {
  let skipLinkComponent: SkipLinkComponent;
  let fixture: ComponentFixture<SkipLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SkipLinkComponent],
      providers: [
        {
          provide: SkipLinkConfig,
          useValue: { skipLinks: [mockSkipLinks] },
        },
        { provide: SkipLinkService, useClass: MockSkipLinkService },
      ],
    }).compileComponents();
  }));

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

  it('should call `scrollToTarget` on button click', () => {
    const spyComponent = spyOn(skipLinkComponent, 'scrollToTarget');
    const element = fixture.debugElement.nativeElement;
    const buttons = element.querySelectorAll('button');
    expect(buttons.length).toEqual(3);
    expect(spyComponent).not.toHaveBeenCalled();

    const mouseEvent = new MouseEvent('mousedown');
    buttons[0].click();
    expect(spyComponent).toHaveBeenCalledWith(mockSkipLinks[0], mouseEvent);
    buttons[1].click();
    expect(spyComponent).toHaveBeenCalledWith(mockSkipLinks[1], mouseEvent);
    buttons[2].click();
    expect(spyComponent).toHaveBeenCalledWith(mockSkipLinks[2], mouseEvent);
  });
});
