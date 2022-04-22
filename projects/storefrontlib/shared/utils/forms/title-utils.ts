import { Title } from '@spartacus/core';

export const titleScores = {
  mr: 1,
  mrs: 2,
  miss: 3,
  ms: 4,
  dr: 5,
  rev: 6,
};

export function sortTitles(title1: Title, title2: Title) {
  if (!titleScores[title1.code] || !titleScores[title2.code]) {
    return 1;
  } else {
    return titleScores[title1.code] - titleScores[title2.code];
  }
}
