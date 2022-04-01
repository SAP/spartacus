import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { KeyboardFocusService } from '../../keyboard-focus';
import {
  SkipLink,
  SkipLinkConfig,
  SkipLinkScrollPosition,
} from '../config/index';
import { SkipLinkService } from './skip-link.service';

const SKIP_KEY_1 = 'Key1';
const SKIP_KEY_2 = 'Key2';
const SKIP_KEY_3 = 'Key3';
const MockSkipLinkConfig: SkipLinkConfig = {
  skipLinks: [
    {
      key: SKIP_KEY_2,
      i18nKey: '',
    },
    {
      key: SKIP_KEY_1,
      i18nKey: '',
      position: SkipLinkScrollPosition.AFTER,
    },
  ],
};

class MockKeyboadFocusService {
  findFirstFocusable() {}
}

@Component({
  template: `
    <ng-container></ng-container>
    <div></div>
    <button class="target" id="skip1" tabindex="0">skip 1</button>
    <div class="target" id="skip2"></div>
  `,
})
class TestContainerComponent {}

describe('SkipLinkService', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: SkipLinkService;
  let keyboardFocusService: KeyboardFocusService;
  let skipLinks: SkipLink[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [TestContainerComponent],
        providers: [
          SkipLinkService,
          {
            provide: SkipLinkConfig,
            useValue: MockSkipLinkConfig,
          },
          {
            provide: KeyboardFocusService,
            useClass: MockKeyboadFocusService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.inject(SkipLinkService);
    keyboardFocusService = TestBed.inject(KeyboardFocusService);

    (<BehaviorSubject<SkipLink[]>>service.getSkipLinks()).next([]);
    skipLinks = (<BehaviorSubject<SkipLink[]>>service.getSkipLinks()).value;
    fixture.detectChanges();
  });

  it('should add skip links in config only', () => {
    service.add(SKIP_KEY_1, null);
    service.add(SKIP_KEY_2, null);
    service.add(SKIP_KEY_3, null);
    expect(skipLinks.length).toEqual(2);
  });

  it('should add skip links in correct order', () => {
    service.add(SKIP_KEY_1, null);
    service.add(SKIP_KEY_2, null);
    service.add(SKIP_KEY_3, null);
    expect(skipLinks.length).toEqual(2);
    expect(skipLinks[0].key).toEqual(SKIP_KEY_2);
    expect(skipLinks[1].key).toEqual(SKIP_KEY_1);
  });

  it('should remove skip links in config only', () => {
    service.add(SKIP_KEY_1, null);
    service.add(SKIP_KEY_2, null);
    service.add(SKIP_KEY_3, null);
    expect(skipLinks.length).toEqual(2);
    expect(skipLinks[0].key).toEqual(SKIP_KEY_2);
    expect(skipLinks[1].key).toEqual(SKIP_KEY_1);
    service.remove(SKIP_KEY_2);
    service.remove(SKIP_KEY_3);
    skipLinks = (<BehaviorSubject<SkipLink[]>>service.getSkipLinks()).value;
    expect(skipLinks.length).toEqual(1);
    expect(skipLinks[0].key).toEqual(SKIP_KEY_1);
  });

  describe('focus target', () => {
    let firstSkipLink: SkipLink;
    let secondSkipLink: SkipLink;

    beforeEach(() => {
      const first = fixture.debugElement.query(By.css('#skip1')).nativeElement;
      const second = fixture.debugElement.query(By.css('#skip2')).nativeElement;
      service.add(SKIP_KEY_1, first);
      service.add(SKIP_KEY_2, second);

      service
        .getSkipLinks()
        .subscribe((links) => {
          // note that they're upside down in the link register...
          secondSkipLink = links[0];
          firstSkipLink = links[1];
        })
        .unsubscribe();
    });

    it('should focus skip link target if autoFocusService will respond undefined', () => {
      spyOn(keyboardFocusService, 'findFirstFocusable').and.returnValue(
        undefined
      );
      const spy = spyOn(firstSkipLink.target, 'focus');
      expect(spy).not.toHaveBeenCalled();
      service.scrollToTarget(firstSkipLink);
      expect(spy).toHaveBeenCalled();
      spy.calls.reset();
    });

    it('should use autoFocusService to find first focusable element for the skiplink target', () => {
      spyOn(keyboardFocusService, 'findFirstFocusable');
      service.scrollToTarget(firstSkipLink);
      expect(keyboardFocusService.findFirstFocusable).toHaveBeenCalledWith(
        firstSkipLink.target
      );
    });

    it('should autofocus first focusable element of the skiplink target', () => {
      spyOn(keyboardFocusService, 'findFirstFocusable').and.returnValue(
        firstSkipLink.target
      );
      spyOn(firstSkipLink.target, 'focus').and.callThrough();
      service.scrollToTarget(firstSkipLink);
      expect(firstSkipLink.target.focus).toHaveBeenCalled();
    });

    it('should not temporarily store tabindex when target has a tabindex', () => {
      spyOn(keyboardFocusService, 'findFirstFocusable').and.returnValue(
        firstSkipLink.target
      );
      spyOn(firstSkipLink.target, 'setAttribute');
      spyOn(firstSkipLink.target, 'removeAttribute');

      service.scrollToTarget(firstSkipLink);

      expect(firstSkipLink.target.setAttribute).not.toHaveBeenCalled();
      expect(firstSkipLink.target.removeAttribute).not.toHaveBeenCalled();
    });

    it('should temporarily store tabindex when target does not have a tabindex', () => {
      spyOn(keyboardFocusService, 'findFirstFocusable').and.returnValue(
        secondSkipLink.target
      );
      spyOn(secondSkipLink.target, 'setAttribute');
      spyOn(secondSkipLink.target, 'removeAttribute');

      service.scrollToTarget(secondSkipLink);

      expect(secondSkipLink.target.setAttribute).toHaveBeenCalledWith(
        'tabindex',
        '-1'
      );
      expect(secondSkipLink.target.removeAttribute).toHaveBeenCalled();
    });
  });
});
