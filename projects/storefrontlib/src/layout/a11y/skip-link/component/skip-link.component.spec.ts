import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkipLinkComponent } from './skip-link.component';
import { I18nTestingModule } from '@spartacus/core';
import { SkipLinkConfig } from '../config';
import { SkipLinkService } from '../service/skip-link.service';
import { BehaviorSubject } from 'rxjs';

const mockSkipLinks = [
  {
    target: null,
    position: null,
    title: 'Link 1',
  },
  {
    target: null,
    position: null,
    title: 'Link 2',
  },
  {
    target: null,
    position: null,
    title: 'Link 3',
  },
];

class MockSkipLinkService {
  skippers = new BehaviorSubject([]);
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
          useValue: { skipLinks: [] },
        },
        { provide: SkipLinkService, useClass: MockSkipLinkService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipLinkComponent);
    skipLinkComponent = fixture.componentInstance;
    skipLinkComponent.links$.next(mockSkipLinks);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(skipLinkComponent).toBeTruthy();
  });

  it('should render skip links', () => {
    const element = fixture.debugElement.nativeElement;
    const buttons = element.querySelectorAll('button');
    expect(buttons.length).toEqual(3);
    expect(buttons[0].outerText).toContain(mockSkipLinks[0].title);
    expect(buttons[1].outerText).toContain(mockSkipLinks[1].title);
    expect(buttons[2].outerText).toContain(mockSkipLinks[2].title);
  });

  it('should call `go` on button click', () => {
    const spyComponent = spyOn(skipLinkComponent, 'go');
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
