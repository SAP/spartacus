import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkipLinkService } from '../service/skip-link.service';
import { SkipLinkConfig, SkipLinkDirective } from '../index';

const SKIP_KEY_1 = 'Key1';
const SKIP_KEY_2 = 'Key2';

@Component({
  template: `
    <ng-container [cxSkipLink]="'${SKIP_KEY_1}'"></ng-container>
    <div [cxSkipLink]="'${SKIP_KEY_2}'"></div>
  `,
})
class TestContainerComponent {}

describe('SkipLinkDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: SkipLinkService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [TestContainerComponent, SkipLinkDirective],
        providers: [
          SkipLinkService,
          {
            provide: SkipLinkConfig,
            useValue: { skipLinks: [] },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.inject(SkipLinkService);
  });

  it('should add skip links on component creation', () => {
    const spy = spyOn(service, 'add');
    const nodes = fixture.debugElement.nativeElement.childNodes;
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(SKIP_KEY_1, nodes[0]);
    expect(spy).toHaveBeenCalledWith(SKIP_KEY_2, nodes[1]);
  });

  it('should remove skip links on component destruction', () => {
    const spy = spyOn(service, 'remove');
    fixture.detectChanges();
    fixture.destroy();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(SKIP_KEY_1);
    expect(spy).toHaveBeenCalledWith(SKIP_KEY_2);
  });
});
