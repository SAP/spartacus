import { Address, User } from '@spartacus/core';
import { defaultAsmConfig } from './default-asm-config';

type Renderer = (user: User) => string;

describe('defaultAsmConfig', () => {
  let user: User;

  beforeEach(() => {
    user = {
      uid: 'test.user@example.com',
      name: 'Test User',
      defaultAddress: {
        phone: '123-456-7890',
      },
    };
  });

  describe('customerList coulumn renderers', () => {
    describe('customer name', () => {
      let renderer: Renderer;

      beforeEach(() => {
        renderer = defaultAsmConfig.asm?.customerList?.columns?.find(
          (coumnDef) =>
            coumnDef.headerLocalizationKey ===
            'asm.customerList.tableHeader.customer'
        )?.renderer as Renderer;
      });

      it('should select the customer name', () => {
        const expected = user.name;

        const actual = renderer(user);

        expect(actual).toEqual(expected);
      });

      it('should fall back to empty string when undefined', () => {
        user.name = undefined;
        const expected = '';

        const actual = renderer(user);

        expect(actual).toEqual(expected);
      });
    });

    describe('customer email/account id', () => {
      let renderer: Renderer;

      beforeEach(() => {
        renderer = defaultAsmConfig.asm?.customerList?.columns?.find(
          (coumnDef) =>
            coumnDef.headerLocalizationKey ===
            'asm.customerList.tableHeader.email'
        )?.renderer as Renderer;
      });

      it('should select the customer email/account id', () => {
        const expected = user.uid;

        const actual = renderer(user);

        expect(actual).toEqual(expected);
      });

      it('should fall back to empty string when undefined', () => {
        user.uid = undefined;
        const expected = '';

        const actual = renderer(user);

        expect(actual).toEqual(expected);
      });
    });

    describe('customer phone', () => {
      let renderer: Renderer;

      beforeEach(() => {
        renderer = defaultAsmConfig.asm?.customerList?.columns?.find(
          (coumnDef) =>
            coumnDef.headerLocalizationKey ===
            'asm.customerList.tableHeader.phone'
        )?.renderer as Renderer;
      });

      it('should select the customer email/account id', () => {
        const expected = user.defaultAddress?.phone;

        const actual = renderer(user);

        expect(actual).toEqual(expected);
      });

      it('should fall back to empty string when address or phone are undefined', () => {
        (user.defaultAddress as Address).phone = undefined;
        const expected = '';

        let actual = renderer(user);

        expect(actual).toEqual(expected);

        user.defaultAddress = undefined;

        actual = renderer(user);

        expect(actual).toEqual(expected);
      });
    });
  });
});
