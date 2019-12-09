import { Type, Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SkipLinkService } from './skip-link.service';
import { SkipLinkConfig, SkipLinkScrollPosition } from '../config';
import { I18nTestingModule } from '@spartacus/core';

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
    service = TestBed.get(SkipLinkService as Type<SkipLinkService>);
    service.skippers.next([]);
    fixture.detectChanges();
  });

  it('should add skip links in config only', () => {
    service.add(SKIP_KEY_1, null);
    service.add(SKIP_KEY_2, null);
    service.add(SKIP_KEY_3, null);
    expect(service.skippers.getValue().length).toEqual(2);
  });

  it('should add skip links in correct order', () => {
    service.add(SKIP_KEY_1, null);
    service.add(SKIP_KEY_2, null);
    service.add(SKIP_KEY_3, null);
    expect(service.skippers.getValue().length).toEqual(2);
    expect(service.skippers.value[0].key).toEqual(SKIP_KEY_2);
    expect(service.skippers.value[1].key).toEqual(SKIP_KEY_1);
  });

  it('should remove skip links in config only', () => {
    service.add(SKIP_KEY_1, null);
    service.add(SKIP_KEY_2, null);
    service.add(SKIP_KEY_3, null);
    expect(service.skippers.getValue().length).toEqual(2);
    expect(service.skippers.value[0].key).toEqual(SKIP_KEY_2);
    expect(service.skippers.value[1].key).toEqual(SKIP_KEY_1);
    service.remove(SKIP_KEY_2);
    service.remove(SKIP_KEY_3);
    expect(service.skippers.getValue().length).toEqual(1);
    expect(service.skippers.value[0].key).toEqual(SKIP_KEY_1);
  });

  it('should go to skip link', () => {
    const nodes = fixture.debugElement.nativeElement.childNodes;
    const mouseEvent: any = { target: fixture.debugElement.nativeElement };
    service.add(SKIP_KEY_1, nodes[0]);
    service.add(SKIP_KEY_2, nodes[1]);
    fixture.detectChanges();

    const skipLink = service.skippers.value[0];
    const spy = spyOn(skipLink.target.parentNode, 'scrollIntoView');
    expect(spy).not.toHaveBeenCalled();
    service.go(skipLink.target, skipLink.position, mouseEvent);
    expect(spy).toHaveBeenCalledWith({});
    spy.calls.reset();
  });

  it('should go to skip link with AFTER position', () => {
    const nodes = fixture.debugElement.nativeElement.childNodes;
    const mouseEvent: any = { target: fixture.debugElement.nativeElement };
    service.add(SKIP_KEY_1, nodes[0]);
    service.add(SKIP_KEY_2, nodes[1]);
    fixture.detectChanges();

    const skipLink = service.skippers.value[1];
    const spy = spyOn(skipLink.target.parentNode, 'scrollIntoView');
    expect(spy).not.toHaveBeenCalled();
    service.go(skipLink.target, skipLink.position, mouseEvent);
    expect(spy).toHaveBeenCalledWith({ inline: 'end' });
    spy.calls.reset();
  });
});
