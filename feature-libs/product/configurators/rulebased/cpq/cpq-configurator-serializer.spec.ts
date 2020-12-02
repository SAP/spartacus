import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CpqConfiguratorSerializer } from './cpq-configurator-serializer';
//import { Cpq } from './cpq.models';
//import { Configurator } from './../core/model/configurator.model';

describe('CpqConfiguratorSerializer', () => {
  let cpqConfiguratorSerializer: CpqConfiguratorSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpqConfiguratorSerializer],
    });

    cpqConfiguratorSerializer = TestBed.inject(
      CpqConfiguratorSerializer as Type<CpqConfiguratorSerializer>
    );
  });

  it('should be created', () => {
    expect(cpqConfiguratorSerializer).toBeTruthy();
  });
});
