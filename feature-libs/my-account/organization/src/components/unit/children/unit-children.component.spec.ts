import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { B2BUnitNode, EntitiesModel, I18nTestingModule } from '@spartacus/core';
import { UnitChildrenComponent } from './unit-children.component';
import { TableModule } from '@spartacus/storefront';
import { CurrentUnitService } from '../current-unit.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { UnitChildrenService } from './unit-children.service';

const code = 'b1';

const mockChildren: EntitiesModel<B2BUnitNode> = {
  values: [
    {
      active: true,
      children: [],
      id: 'Rustic Services',
      name: 'Rustic Services',
      parent: 'Rustic',
    },
    {
      active: true,
      children: [],
      id: 'Rustic Retail',
      name: 'Rustic Retail',
      parent: 'Rustic',
    },
  ],
};

class MockUnitChildrenService {
  getTable = function () {
    return of(mockChildren);
  };
}

class MockCurrentUnitService {
  key$ = of(code);
}

describe('UnitChildrenComponent', () => {
  let component: UnitChildrenComponent;
  let fixture: ComponentFixture<UnitChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        TableModule,
      ],
      declarations: [UnitChildrenComponent],
      providers: [
        {
          provide: UnitChildrenService,
          useClass: MockUnitChildrenService,
        },
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
