import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDescriptionPageComponent } from './store-description-page.component';

describe('StoreDescriptionPageComponentComponent', () => {
  let component: StoreDescriptionPageComponent;
  let fixture: ComponentFixture<StoreDescriptionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreDescriptionPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
