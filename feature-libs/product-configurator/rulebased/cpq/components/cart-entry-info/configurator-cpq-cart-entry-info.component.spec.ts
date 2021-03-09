import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorCPQCartEntryInfoComponent } from './configurator-cpq-cart-entry-info.component';

describe('ConfiguratorCpqCartEntryInfoComponent', () => {
  let component: ConfiguratorCPQCartEntryInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCPQCartEntryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguratorCPQCartEntryInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorCPQCartEntryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
