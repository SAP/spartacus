import { extractPreviousVersionForChangelog } from './versions';
const using = require('jasmine-data-provider');

type TestCase = {
  description: string,
  newVersion: string,
  previousVersion: string | null,
}

const testVersions: string[] = [
  '1.0.0',
  '1.1.0',
  '1.1.1-alpha.0',
  '1.1.1',
  '1.1.2-rc.0',
  '1.2.0-alpha.0',
  '1.2.0-beta.0',
  '1.2.0-next.0',
  '1.2.0-rc.0',
  '2.0.0',
  '2.2.2',
  '2.3.0-beta.0',
  '3.0.0-rc.0'
];

const cases: TestCase[] = [
  {
    description: 'should return previous stable release for new minor release',
    newVersion: '1.2.0',
    previousVersion: '1.1.1',
  },
  {
    description: 'should return previous stable release for new patch release',
    newVersion: '1.1.2',
    previousVersion: '1.1.1',
  },
  {
    description: 'should return previous stable release for new major release',
    newVersion: '3.0.0',
    previousVersion: '2.2.2',
  },
  {
    description: 'should return previous next for new next release',
    newVersion: '1.2.0-next.1',
    previousVersion: '1.2.0-next.0',
  },
  {
    description: 'should return previous stable for new next release if there are no previous next releases',
    newVersion: '2.1.0-next.0',
    previousVersion: '2.0.0'
  },
  {
    description: 'should return previous alpha for new alpha release',
    newVersion: '1.2.0-alpha.1',
    previousVersion: '1.2.0-alpha.0',
  },
  {
    description: 'should return previous stable for new alpha release if there are no previous alpha releases',
    newVersion: '2.1.0-alpha.0',
    previousVersion: '2.0.0'
  },
  {
    description: 'should return previous beta for new beta release',
    newVersion: '1.2.0-beta.1',
    previousVersion: '1.2.0-beta.0',
  },
  {
    description: 'should return previous alpha for new beta release if there are no previous beta releases',
    newVersion: '1.1.1-beta.0',
    previousVersion: '1.1.1-alpha.0'
  },
  {
    description: 'should return previous stable for nee beta release if there are no previous alpha and beta releases',
    newVersion: '2.1.0-beta.0',
    previousVersion: '2.0.0'
  },
  {
    description: 'should return previous rc for new rc release',
    newVersion: '1.2.0-rc.1',
    previousVersion: '1.2.0-rc.0'
  },
  {
    description: 'should return previous beta for new rc release if there are no previous rc releases',
    newVersion: '2.3.0-rc.0',
    previousVersion: '2.3.0-beta.0'
  },
  {
    description: 'should return previous alpha for new rc release if there are no previous rc and beta releases',
    newVersion: '1.1.1-rc.0',
    previousVersion: '1.1.1-alpha.0',
  },
  {
    description: 'should return previous stable version for rc release if there are nor previous prereleases',
    newVersion: '2.1.0-rc.0',
    previousVersion: '2.0.0',
  },
  {
    description: 'should return previous non standard release (no alpha,beta,rc) for other prereleases',
    newVersion: '1.2.0-other.0',
    previousVersion: '1.2.0-next.0'
  },
  {
    description: 'should return null for first release',
    newVersion: '0.1.0',
    previousVersion: null
  },
  {
    description: 'should return null for first prerelease',
    newVersion: '0.1.0-alpha.0',
    previousVersion: null
  }
]

function testCaseFactory(testCase: TestCase): void {
  it(testCase.description, () => {
    expect(extractPreviousVersionForChangelog(testVersions, testCase.newVersion)).toBe(testCase.previousVersion);
  })
  return
}

describe('Extract previous version for changelog', () => {
  using(cases, testCaseFactory)
})
