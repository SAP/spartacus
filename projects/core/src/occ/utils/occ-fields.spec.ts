import {
  extractFields,
  mergeFields,
  optimizeFields,
  parseFields,
  stringifyFields,
} from './occ-fields';

describe('mergeFields', () => {
  it('should merge simple fields', () => {
    expect(mergeFields(['ala', 'ma'])).toEqual('ala,ma');
    expect(mergeFields(['ala,ula', 'ma'])).toEqual('ala,ula,ma');
    expect(mergeFields(['ala,ula', 'ma,kota'])).toEqual('ala,ula,ma,kota');
    expect(mergeFields(['ala,ula', 'ma,kota,i', 'psa'])).toEqual(
      'ala,ula,ma,kota,i,psa'
    );
    expect(mergeFields(['ala,ula', 'ma,kota,i', 'psa'])).toEqual(
      'ala,ula,ma,kota,i,psa'
    );

    expect(mergeFields(['ala,ula', 'ala,ela,ma,kota,i', 'kota,psa'])).toEqual(
      'ala,ula,ela,ma,kota,i,psa'
    );
  });

  it('should merge nested fields', () => {
    expect(mergeFields(['ala(lubi)', 'ma'])).toEqual('ala(lubi),ma');
    expect(mergeFields(['ala(lubi),ula', 'ma,ala(chodzi)'])).toEqual(
      'ala(lubi,chodzi),ula,ma'
    );
    expect(
      mergeFields(['ala(lubi(koty)),ula', 'ma,ala(lubi(i,psy),chodzi,pieszo)'])
    ).toEqual('ala(lubi(koty,i,psy),chodzi,pieszo),ula,ma');
  });

  it('should optimize BASIC, DEFAULT and FULL fields', () => {
    expect(mergeFields(['test(FULL)', 'test(DEFAULT)', 'test(BASIC)'])).toEqual(
      'test(FULL)'
    );

    expect(mergeFields(['test(FULL)', 'test(ala,ma)'])).toEqual(
      'test(FULL,ala,ma)'
    );
  });

  it('should accept string and AST objects for fields definition', () => {
    expect(mergeFields(['ala', { ma: { kota: {} } }])).toEqual('ala,ma(kota)');
  });
});

describe('optimizeFields', () => {
  it('should remove BASIC and DEFAULT if FULL is present', () => {
    expect(
      optimizeFields({ BASIC: {}, FULL: {}, DEFAULT: {}, test: {} })
    ).toEqual({
      FULL: {},
      test: {},
    });
  });
  it('should remove BASIC if DEFAULT is present', () => {
    expect(optimizeFields({ BASIC: {}, DEFAULT: {} })).toEqual({
      DEFAULT: {},
    });
  });
  it('should optimize nested fields', () => {
    expect(optimizeFields({ ala: { DEFAULT: {}, BASIC: {} } })).toEqual({
      ala: { DEFAULT: {} },
    });
  });
});

describe('parseFields', () => {
  it('should parse basic fields', () => {
    expect(parseFields('ala,ma,kota')).toEqual({ ala: {}, ma: {}, kota: {} });
  });
  it('should parse nested fields', () => {
    expect(parseFields('ala(lubi(koty)),ula')).toEqual({
      ala: {
        lubi: {
          koty: {},
        },
      },
      ula: {},
    });

    expect(parseFields('ala(lubi(i,psy),ula)')).toEqual({
      ala: {
        lubi: {
          i: {},
          psy: {},
        },
        ula: {},
      },
    });
  });
  it('should parse complex fields', () => {
    expect(
      parseFields(
        'ala,nie,wie(albo,i(co),wie(ale,nie,wiadomo)),ze,ona(lubi(koty)),ula'
      )
    ).toEqual({
      ala: {},
      nie: {},
      wie: {
        albo: {},
        i: {
          co: {},
        },
        wie: {
          ale: {},
          nie: {},
          wiadomo: {},
        },
      },
      ze: {},
      ona: {
        lubi: {
          koty: {},
        },
      },
      ula: {},
    });
  });
  it('should parse not strictly valid fields', () => {
    expect(parseFields('ala(lubi(koty())),,,ula')).toEqual({
      ala: {
        lubi: {
          koty: {},
        },
      },
      ula: {},
    });
  });
});

describe('stringifyFields', () => {
  it('should stringify simple fields', () => {
    expect(stringifyFields({ ala: {}, ma: {}, kota: {} })).toEqual(
      'ala,ma,kota'
    );
  });
  it('should stringify nested fields', () => {
    expect(
      stringifyFields({
        ala: {},
        ma: { o: {} },
        kota: { i: { psa: {}, burka: {} } },
      })
    ).toEqual('ala,ma(o),kota(i(psa,burka))');
  });
});

describe('extractFields for given fields definition', () => {
  let data: any;
  beforeEach(() => {
    data = {
      ala: 'val1',
      ula: { franek: 'val2', tolek: 'val3' },
      ela: 'val4',
    };
  });

  it('should extract part of the object', () => {
    expect(extractFields(data, 'ala,ela')).toEqual({
      ala: 'val1',
      ela: 'val4',
    });
  });
  it('should work for nested object', () => {
    expect(extractFields(data, 'ala,ula(franek)')).toEqual({
      ala: 'val1',
      ula: { franek: 'val2' },
    });
  });
  it('should work for nested object', () => {
    expect(extractFields(data, 'ala,ula')).toEqual({
      ala: 'val1',
      ula: { franek: 'val2', tolek: 'val3' },
    });
  });
  it('should not create missing keys', () => {
    expect(extractFields(data, 'ala,tola')).toEqual({
      ala: 'val1',
    });
  });
  it('should not extract if BASIC, DEFAULT or FULL is used', () => {
    expect(extractFields(data, 'ala,ela,FULL')).toEqual(data);
    expect(extractFields(data, 'ala,ela,DEFAULT')).toEqual(data);
    expect(extractFields(data, 'ala,ela,BASIC')).toEqual(data);
  });
  it('should not extract nested parts if BASIC, DEFAULT or FULL is used', () => {
    expect(extractFields(data, 'ala,ula(FULL,tolek)')).toEqual({
      ala: 'val1',
      ula: { franek: 'val2', tolek: 'val3' },
    });
  });
  it('should accept string or AST object as fields', () => {
    expect(extractFields(data, { ala: {}, ula: { franek: {} } })).toEqual({
      ala: 'val1',
      ula: { franek: 'val2' },
    });
  });
});
