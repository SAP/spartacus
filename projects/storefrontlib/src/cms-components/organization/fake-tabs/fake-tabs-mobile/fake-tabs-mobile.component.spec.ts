import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { FakeTabsMobileComponent } from './fake-tabs-mobile.component';
import { TabLink } from '../tab-link.model';
import { I18nTestingModule } from '@spartacus/core';

const mockLinks: Array<TabLink> = [
  { name: 'link1', cxRoute: 'route1', active: false },
  { name: 'link2', cxRoute: 'route2', active: true },
  { name: 'link3', cxRoute: 'route3', active: false },
];

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('FakeTabsMobileComponent', () => {
  let component: FakeTabsMobileComponent;
  let fixture: ComponentFixture<FakeTabsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FakeTabsMobileComponent, MockUrlPipe],
      imports: [I18nTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeTabsMobileComponent);
    component = fixture.componentInstance;
    component.links = mockLinks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    const items = fixture.debugElement.queryAll(By.css('.cx-list-media > a'));
    expect(items.length).toEqual(2);

    expect(items[0].nativeElement.textContent).toEqual(' link1 ');
    expect(items[0].nativeElement.getAttribute('href')).toEqual('/');

    expect(items[1].nativeElement.textContent).toEqual(' link3 ');
    expect(items[1].nativeElement.getAttribute('href')).toEqual('/');
  });
});
