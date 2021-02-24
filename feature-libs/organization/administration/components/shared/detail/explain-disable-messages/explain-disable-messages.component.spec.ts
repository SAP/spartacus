import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ItemService } from '../../item.service';
import { BaseItem } from '../../organization.model';

import { ExplainDisableMessagesComponent } from './explain-disable-messages.component';

const current$ = new BehaviorSubject({});
class MockItemService {
  current$ = current$.asObservable();
}

const defaultConfigScenarios = [
  {
    key: 'display disabledEdit message when item is disabled',
    currentValue: { active: false, orgUnit: { active: true } },
    displayMessageConfig: {},
    expectedValue: ['orgUnit.messages.disabledEdit'],
  },
  {
    key: 'not display disabledEdit message when item is enabled ',
    currentValue: { active: true, orgUnit: { active: true } },
    displayMessageConfig: {},
    expectedValue: [],
  },
  {
    key: "display disabledEnable message when item's parent is disabled",
    currentValue: { active: true, orgUnit: { active: false } },
    displayMessageConfig: {},
    expectedValue: ['orgUnit.messages.disabledEnable'],
  },
  {
    key:
      "display disabledEdit and disabledEnable message when item and item's parent are disabled",
    currentValue: { active: false, orgUnit: { active: false } },
    displayMessageConfig: {},
    expectedValue: [
      'orgUnit.messages.disabledEdit',
      'orgUnit.messages.disabledEnable',
    ],
  },
  {
    key:
      'not display disabledEdit or disabledEnable message when item & parent are enabled',
    currentValue: { active: true, orgUnit: { active: true } },
    displayMessageConfig: {},
    expectedValue: [],
  },
  {
    key: "display disabledDisable message when it's a root unit",
    currentValue: {
      uid: 'test',
      name: 'test',
      parentOrgUnit: 'test',
      active: true,
    },
    displayMessageConfig: {},
    expectedValue: ['orgUnit.messages.disabledDisable'],
  },
];

const configEnabledScenarios = [
  {
    key: 'disabledEdit',
    currentValue: { active: false, orgUnit: { active: true } },
    displayMessageConfig: { disabledEdit: true },
    expectedValue: ['orgUnit.messages.disabledEdit'],
  },
  {
    key: 'disabledEnable',
    currentValue: { active: true, orgUnit: { active: false } },
    displayMessageConfig: { disabledEnable: true },
    expectedValue: ['orgUnit.messages.disabledEnable'],
  },
  {
    key: 'disabledEdit and disabledEnable',
    currentValue: { active: false, orgUnit: { active: false } },
    displayMessageConfig: { disabledEdit: true, disabledEnable: true },
    expectedValue: [
      'orgUnit.messages.disabledEdit',
      'orgUnit.messages.disabledEnable',
    ],
  },
  {
    key: 'disabledCreate',
    currentValue: { active: false },
    displayMessageConfig: {
      disabledEdit: false,
      disabledEnable: false,
      disabledCreate: true,
    },
    expectedValue: ['orgUnit.messages.disabledCreate'],
  },
  {
    key: 'disabledDisable',
    currentValue: {
      uid: 'test',
      name: 'test',
      parentOrgUnit: 'test',
      active: true,
    },
    displayMessageConfig: {
      disabledDisable: true,
    },
    expectedValue: ['orgUnit.messages.disabledDisable'],
  },
];

const configDisabledScenarios = [
  {
    key: 'disabledEdit',
    currentValue: { active: false, orgUnit: { active: true } },
    displayMessageConfig: { disabledEdit: false },
    expectedValue: [],
  },
  {
    key: 'disabledEnable',
    currentValue: { active: true, orgUnit: { active: false } },
    displayMessageConfig: { disabledEnable: false },
    expectedValue: [],
  },
  {
    key: 'disabledEdit and disabledEnable',
    currentValue: { active: false, orgUnit: { active: false } },
    displayMessageConfig: { disabledEdit: false, disabledEnable: false },
    expectedValue: [],
  },
  {
    key: 'disabledCreate',
    currentValue: { active: false, orgUnit: { active: false } },
    displayMessageConfig: {
      disabledEdit: false,
      disabledCreate: false,
      disabledEnable: false,
    },
    expectedValue: [],
  },
  {
    key: 'disabledDisable',
    currentValue: {
      uid: 'test',
      name: 'test',
      parentOrgUnit: 'test',
      active: true,
    },
    displayMessageConfig: {
      disabledDisable: false,
    },
    expectedValue: [],
  },
];

const unusedMessagesScenarios = [
  {
    key: 'disabledEdit',
    currentValue: { active: true, orgUnit: { active: true } },
    displayMessageConfig: { disabledEdit: true },
    expectedValue: [],
  },
  {
    key: 'disabledEnable',
    currentValue: { active: true, orgUnit: { active: true } },
    displayMessageConfig: { disabledEnable: true },
    expectedValue: [],
  },
  {
    key: 'disabledCreate',
    currentValue: { active: true },
    displayMessageConfig: {
      disabledEdit: false,
      disabledEnable: false,
      disabledCreate: true,
    },
    expectedValue: [],
  },
];

const i18nRootScenario = {
  currentValue: { active: false, orgUnit: { active: false } },
  displayMessageConfig: {},
  expectedValue: [
    'myRoot.messages.disabledEdit',
    'myRoot.messages.disabledEnable',
  ],
};

describe('ExplainDisableMessagesComponent', () => {
  let component: ExplainDisableMessagesComponent<BaseItem>;
  let fixture: ComponentFixture<ExplainDisableMessagesComponent<BaseItem>>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, IconModule],
      declarations: [ExplainDisableMessagesComponent],
      providers: [
        {
          provide: ItemService,
          useClass: MockItemService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplainDisableMessagesComponent);
    component = fixture.componentInstance;
    component.i18nRoot = 'orgUnit';
  });

  function verifyScenario({
    displayMessageConfig,
    currentValue,
    expectedValue,
  }) {
    component.displayMessageConfig = displayMessageConfig;
    component.ngOnInit();
    current$.next(currentValue);
    fixture.detectChanges();
    const values = fixture.debugElement
      .queryAll(By.css('section > ul > li'))
      .map((el) => el.nativeNode.innerText);
    expect(values).toEqual(expectedValue);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('verify default configuration', () => {
    defaultConfigScenarios.forEach((scenario) =>
      it(`should ${scenario.key}`, () => verifyScenario(scenario))
    );
  });

  describe('verify steering by displayMessageConfig', () => {
    configEnabledScenarios.forEach((scenario) => {
      it(`should display ${scenario.key} message when ${scenario.key} is enabled`, () => {
        verifyScenario(scenario);
      });
    });

    configDisabledScenarios.forEach((scenario) => {
      it(`should not display ${scenario.key} message when ${scenario.key} is disabled`, () => {
        verifyScenario(scenario);
      });
    });
  });

  describe('verify behavior for active item or active parent', () => {
    unusedMessagesScenarios.forEach((scenario) => {
      it(`should not display message for ${scenario.key} when item is active`, () => {
        verifyScenario(scenario);
      });
    });
  });

  describe('verify i18n root', () => {
    it('should use the i18n root provided from the parent component', () => {
      component.i18nRoot = 'myRoot';
      verifyScenario(i18nRootScenario);
    });
  });
});
