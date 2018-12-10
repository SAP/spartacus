import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { of } from 'rxjs';

import { RoutingService } from '@spartacus/core';

import { HomePageComponent } from './home-page.component';

@Component({
  selector: 'cx-landing-page-layout',
  template: ''
})
export class MockLandingPageLayoutComponent {}

const routerState = {
  state: {
    queryParams: {
      cmsTicketId: 'mockCmsTicketId'
    }
  }
};
class MockRoutingService {
  getRouterState() {
    return of(routerState);
  }
}
describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, MockLandingPageLayoutComponent],
      providers: [{ provide: RoutingService, useClass: MockRoutingService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get cmsTicketId', () => {
    component.ngOnInit();
    expect(component.cmsTicketId).toEqual('mockCmsTicketId');
  });
});
