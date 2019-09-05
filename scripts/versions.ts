import * as pkgVersions from 'npm-package-versions';
import * as program from 'commander';
import chalk from 'chalk';
import * as semverExtra from 'semver-extra';
// import * as semverDiff from 'semver-diff';
import * as semver from 'semver';

function pkgVersionsPromise(packageName: string) {
  return new Promise((resolve, reject) => {
    pkgVersions(packageName, (err, versions) => {
      if (err) {
        reject(err);
      }
      resolve(versions);
    })
  })
}

export interface VersionsOptions {
  newVersion: string;
  npmPackage: string;
  tagTemplate: string;
}

program.option('--new-version <version>', 'New proposed version')
.option('--npm-package <package-name>', 'What package version check')
.option('--tag-template <template>', 'Tag template used to find git tag for passed version')
.parse(process.argv);

const config = {
  newVersion: program.newVersion,
  npmPackage: program.npmPackage,
  tagTemplate: program.tagTemplate,
}

if (typeof config.newVersion === 'undefined') {
  console.error(chalk.red('Missing --new-version option'));
  process.exit(1);
}
if (typeof config.npmPackage === 'undefined') {
  console.error(chalk.red('Missing --npm-package option'));
  process.exit(1);
}
if (typeof config.tagTemplate === 'undefined') {
  console.error(chalk.red('Missing --tag-template option'));
  process.exit(1);
}

async function extractPreviousVersionForChangelog({npmPackage, newVersion}: VersionsOptions) {
  const packageVersions: string[] = (await pkgVersionsPromise(npmPackage)) as string[];

  const testVersions = [
    '0.1.0-alpha.1',
    '0.2.0',
    '1.0.0',
    '1.2.3',
    '1.2.3-rc.0',
    '1.2.3-rc.1',
    '1.2.4',
    '2.4.2',
    '3.4.2'
  ]

  type VersionDetails = {
    version: string;
    prerelease: false | string;
  }

  function extractVersionDetails(version: string): VersionDetails {
    const versions = [undefined,'alpha', 'beta', 'rc', 'next'];
    const prerelease: false | string = versions.reduce((pre, ver) => {
      const res = semverExtra.isPrerelease(version, ver)
      return res ? (ver ? ver : 'other') : pre
    }, false);
    return {
      version,
      prerelease,
    }
  }

  function searchLatestBeforeVersion(versions: string[], version: string): string {
    if(!versions.length) {
      return null;
    }
    let latestStable = null;
    versions.forEach(ver => {
      if (latestStable === null && semver.gt(version, ver)) {
        latestStable = ver;
      } else if (latestStable !== null && semver.gt(version, ver) && semver.gt(ver, latestStable)) {
        latestStable = ver;
      }
    })
    return latestStable;
  }

  function searchLatestStableBeforeVersion(versions: string[], version: string): string {
    return searchLatestBeforeVersion(versions.filter(semverExtra.isStable), version);
  }

  const lastStableReleaseOnNpm = extractVersionDetails(semverExtra.maxStable(packageVersions));
  const lastReleaseOnNpm = extractVersionDetails('1.0.0-rc.2' || semverExtra.max(packageVersions));
  const nextVersion = extractVersionDetails(newVersion);
  console.log('lastRelease', lastReleaseOnNpm);
  console.log('lastStable', lastStableReleaseOnNpm);
  console.log('nextVersion', nextVersion)
  console.log('before', searchLatestBeforeVersion(testVersions, '0.1.0'));
  console.log('before', searchLatestStableBeforeVersion(testVersions, '0.1.0'));

  const isNextReleaseStable = !nextVersion.prerelease;
  console.log('stable', isNextReleaseStable)

  let prevVersionForChangelog;

  // Use case for stable releases
  // We want to provide full changelog since last stable release for them
  if (isNextReleaseStable) {
    prevVersionForChangelog = searchLatestStableBeforeVersion(packageVersions, nextVersion.version);
    // there was no previous stable release
    // fallback to latest prerelease
    if (prevVersionForChangelog === null) {
      prevVersionForChangelog = searchLatestBeforeVersion(packageVersions, nextVersion.version);
    }
  } else {
    // handle prereleases
    // show changelog since last prerelease for this version
    // is this is a first prerelease fallback to latestStable version before that

    // TODO only look for stables and this type of prereleases
    // beta could allow for alpha releases
    // RC could allow for alpha and beta release
    // next only allows next
    prevVersionForChangelog = searchLatestBeforeVersion(packageVersions, nextVersion.version);
  }


  // const tagOfNewRelease =
  // console.log(packageVersions);
}

extractPreviousVersionForChangelog(config);

