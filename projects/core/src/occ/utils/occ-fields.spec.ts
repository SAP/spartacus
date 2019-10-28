import { mergeFields } from './occ-fields';

describe('mergeFields', () => {
  it('should convert stuff', () => {
    const fields = ['ala', 'ma'];

    expect(mergeFields(fields)).toEqual('ala,ma');
  });

  it('should convert stuff', () => {
    const fields = ['ala,ma(kota(full(ola)),i(noga),psa)', 'ma'];

    expect(mergeFields(fields)).toEqual('ala,ma');
  });
});
