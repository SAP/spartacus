import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDescriptionPageLayoutComponent } from './store-description-page-layout.component';

describe('StoreDescriptionPageLayoutComponent', () => {
  let component: StoreDescriptionPageLayoutComponent;
  let fixture: ComponentFixture<StoreDescriptionPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDescriptionPageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDescriptionPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
