import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOverviewLoadingComponent } from './config-overview-loading.component';

describe('ConfigOverviewLoadingComponent', () => {
  let component: ConfigOverviewLoadingComponent;
  let fixture: ComponentFixture<ConfigOverviewLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigOverviewLoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigOverviewLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
