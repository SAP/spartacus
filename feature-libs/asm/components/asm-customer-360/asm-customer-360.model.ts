import {
  Customer360Section,
  CUSTOMER_360_SECTION_TITLE,
} from '@spartacus/asm/root';

export const Customer360Sections: Customer360Section[] = [
  {
    sectionTitle: CUSTOMER_360_SECTION_TITLE.OVERVIEW,
    sectionContent: 'Placeholder content for Overview tab',
  },
  {
    sectionTitle: CUSTOMER_360_SECTION_TITLE.PROFILE,
    sectionContent: 'Placeholder content for Profile tab',
  },
  {
    sectionTitle: CUSTOMER_360_SECTION_TITLE.ACTIVITY,
    sectionContent: 'Placeholder content for Activity tab',
  },
  {
    sectionTitle: CUSTOMER_360_SECTION_TITLE.FEEDBACK,
    sectionContent: 'Placeholder content for Feedback tab',
  },
  {
    sectionTitle: CUSTOMER_360_SECTION_TITLE.PROMOTIONS,
    sectionContent: 'Placeholder content for Promotions tab',
  },
  {
    sectionTitle: CUSTOMER_360_SECTION_TITLE.MAPS,
    sectionContent: 'Placeholder content for Maps tab',
  },
];

export interface Fragment {
  type: string;
  text: string;
}

export interface keyValuePair {
  key: string;
  value: string;
}

export type Class<T, U> = new (arg: U) => T;
