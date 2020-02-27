import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkipLinkService } from './skip-link.service';
import {
  SkipLink,
  SkipLinkConfig,
  SkipLinkScrollPosition,
} from '../config/index';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';

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
  template: '<ng-container></ng-container><div></div>',
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
    const mouseEvent: any = { target: fixture.debugElement.nativeElement };
    service.add(SKIP_KEY_1, nodes[0]);
    service.add(SKIP_KEY_2, nodes[1]);
    fixture.detectChanges();

    const skipLink = skipLinks[0];
    const spy = spyOn(
      <HTMLElement>skipLink.target.parentNode,
      'scrollIntoView'
    );
    expect(spy).not.toHaveBeenCalled();
    service.scrollToTarget(skipLink.target, skipLink.position, mouseEvent);
    expect(spy).toHaveBeenCalledWith({});
    spy.calls.reset();
  });

  it('should scroll to skip link target with AFTER position', () => {
    const nodes = fixture.debugElement.nativeElement.childNodes;
    const mouseEvent: any = { target: fixture.debugElement.nativeElement };
    service.add(SKIP_KEY_1, nodes[0]);
    service.add(SKIP_KEY_2, nodes[1]);
    fixture.detectChanges();

    const skipLink = skipLinks[1];
    const spy = spyOn(
      <HTMLElement>skipLink.target.parentNode,
      'scrollIntoView'
    );
    expect(spy).not.toHaveBeenCalled();
    service.scrollToTarget(skipLink.target, skipLink.position, mouseEvent);
    expect(spy).toHaveBeenCalledWith({ inline: 'end' });
    spy.calls.reset();
  });
});
