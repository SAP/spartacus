import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { GenericLinkDirective } from './generic-link.directive';
import { GenericLinkComponentService } from './generic-link-component.service';
import { Router } from '@angular/router';
import createSpy = jasmine.createSpy;
import { RoutingService } from '@spartacus/core';

@Component({
  template: `<a [cxGenericLink]="url" href="{{ url }}" target="{{ target }}"
    >Test Link</a
  >`,
})
class TestComponent {
  url: string = '';
  target: string = '';
}

class MockRoutingService {
  go = createSpy().and.stub();
  getUrl = createSpy().and.returnValue('/internal-link');
}

describe('GenericLinkDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;
  let router: Router;
  let service: GenericLinkComponentService;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, GenericLinkDirective],
      imports: [RouterTestingModule],
      providers: [
        GenericLinkComponentService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(
      By.directive(GenericLinkDirective)
    ).nativeElement;
    router = TestBed.inject(Router);
    service = TestBed.inject(GenericLinkComponentService);
    routingService = TestBed.inject(RoutingService);
    spyOn(router, 'navigateByUrl');
    spyOn(window, 'open');
    spyOn(service, 'isExternalUrl').and.callFake((url: string) =>
      url.startsWith('https')
    );
    fixture.detectChanges();
  });

  it('should navigate to external url on click', () => {
    component.url = 'https://www.example.com';
    component.target = '_blank';
    fixture.detectChanges();

    element.click();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should navigate to internal url on click', () => {
    component.url = '/internal-link';
    component.target = '';
    fixture.detectChanges();

    element.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/internal-link');
  });

  it('should update href for internal URL', () => {
    const testUrl = '/internal-link';

    spyOn(router, 'createUrlTree').and.returnValue({} as any);
    spyOn(router, 'serializeUrl').and.returnValue('/home');

    component.url = testUrl;
    component.target = '';
    fixture.detectChanges();

    expect(routingService.getUrl).toHaveBeenCalledWith(testUrl);

    const anchorElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(anchorElement.getAttribute('href')).toBe(testUrl);
  });
});
