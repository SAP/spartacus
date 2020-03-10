import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
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

@Component({
  template: `
    <ng-container></ng-container>
    <div></div>
    <a id="skip1">skip 1</a>
    <a id="skip2">skip 2</a>
  `,
})
class TestContainerComponent {}

describe('SkipLinkService', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: SkipLinkService;
  let skipLinks: SkipLink[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [TestContainerComponent],
      providers: [
        SkipLinkService,
        {
          provide: SkipLinkConfig,
          useValue: MockSkipLinkConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.inject(SkipLinkService);
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

  it('should scroll to skip link target', () => {
    const nodes = fixture.debugElement.nativeElement.childNodes;
    service.add(SKIP_KEY_1, nodes[0]);
    service.add(SKIP_KEY_2, nodes[1]);
    fixture.detectChanges();

    const skipLink = skipLinks[0];
    const spy = spyOn(skipLink.target, 'focus');
    expect(spy).not.toHaveBeenCalled();
    service.scrollToTarget(skipLink);
    expect(spy).toHaveBeenCalled();
    spy.calls.reset();
  });
});
