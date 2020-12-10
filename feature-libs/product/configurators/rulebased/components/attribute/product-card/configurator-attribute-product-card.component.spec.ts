import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';

describe('ConfiguratorAttributeProductCardComponent', () => {
  let component: ConfiguratorAttributeProductCardComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeProductCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeProductCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
