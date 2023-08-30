import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorChatComponent } from './configurator-chat.component';

describe('ConfiguratorChatComponent', () => {
  let component: ConfiguratorChatComponent;
  let fixture: ComponentFixture<ConfiguratorChatComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorChatComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
