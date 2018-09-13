import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleComponent } from './schedule.component';
import { StoreDataService } from '../../services';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const closedDay = new Date();
const openDay1 = new Date();
const openDay2 = new Date();

class StoreDataServiceMock {
  isStoreOpen(location: any, date: Date): boolean {
    return true;
  }

  getOpenningTime(location: any, date: Date): Date {
    return new Date();
  }

  getClosingTime(location: any, date: Date): Date {
    return new Date();
  }
}

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let storeDataService: StoreDataService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      providers: [{ provide: StoreDataService, useClass: StoreDataServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    storeDataService = TestBed.get(StoreDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
