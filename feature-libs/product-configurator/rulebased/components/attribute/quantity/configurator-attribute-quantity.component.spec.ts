import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';

describe(' ConfiguratorAttributeQuantityComponent', () => {
  let component: ConfiguratorAttributeQuantityComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeQuantityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
