/// <reference path="./types.d.ts" />
import * as semver from 'semver';
import * as semverExtra from 'semver-extra';
import pkgVersions = require('npm-package-versions');

function pkgVersionsPromise(packageName: string) {
  return new Promise((resolve, reject) => {
    pkgVersions(packageName, (err: any, versions: string[]) => {
      if (err) {
        reject(err);
      }
      resolve(versions);
    });
  });
}

export async function fetchPackageVersions(npmPackage: string) {
  try {
    const packageVersions: string[] = (await pkgVersionsPromise(
      npmPackage
    )) as string[];
    return packageVersions;
  } catch (err) {
    throw new Error('Package not found');
  }
}

export function extractPreviousVersionForChangelog(
  packageVersions: string[],
  newVersion: string
) {
  type VersionDetails = {
    version: string;
    prerelease: false | string;
  };

  function extractVersionDetails(version: string): VersionDetails {
    const versions = [undefined, 'alpha', 'beta', 'rc', 'next'];
    const prerelease: false | string = versions.reduce(
      (pre: false | string, ver) => {
        const res = semverExtra.isPrerelease(version, ver);
        return res ? (ver ? ver : 'other') : pre;
      },
      false
    );
    return {
      version,
      prerelease,
    };
  }

  function searchLatestBeforeVersion(
    versions: string[],
    version: string
  ): string | null {
    if (!versions.length) {
      return null;
    }
    let latestStable: string | null = null;
    versions.forEach((ver) => {
      if (latestStable === null && semver.gt(version, ver)) {
        latestStable = ver;
      } else if (
        latestStable !== null &&
        semver.gt(version, ver) &&
        semver.gt(ver, latestStable)
      ) {
        latestStable = ver;
      }
    });
    return latestStable;
  }

  function searchLatestStableBeforeVersion(
    versions: string[],
    version: string
  ): string | null {
    return searchLatestBeforeVersion(filterStableVersions(versions), version);
  }

  function filterStableVersions(versions: string[]): string[] {
    return versions.filter(semverExtra.isStable);
  }

  function filterPrereleases(
    versions: string[],
    prereleases: string[]
  ): string[] {
    let filteredVersions: string[] = [];
    prereleases.forEach((prerelease) => {
      const filtered = versions
        .map((version) => extractVersionDetails(version))
        .filter((versionDetails) => versionDetails.prerelease === prerelease)
        .map((versionDetails) => versionDetails.version);
      filteredVersions = [...filteredVersions, ...filtered];
    });
    return filteredVersions;
  }

  const nextVersion = extractVersionDetails(newVersion);

  const isNextReleaseStable = !nextVersion.prerelease;

  let prevVersionForChangelog;

  // Use case for stable releases
  // We want to provide full changelog since last stable release for them
  if (isNextReleaseStable) {
    prevVersionForChangelog = searchLatestStableBeforeVersion(
      packageVersions,
      nextVersion.version
    );
    // there was no previous stable release
    // fallback to latest prerelease
    if (prevVersionForChangelog === null) {
      prevVersionForChangelog = searchLatestBeforeVersion(
        packageVersions,
        nextVersion.version
      );
    }
  } else {
    // handle prereleases
    // show changelog since last prerelease for this version
    // is this is a first prerelease fallback to latestStable version before that
    let allowedVersions = [...filterStableVersions(packageVersions)];
    if (nextVersion.prerelease === 'alpha') {
      allowedVersions = [
        ...allowedVersions,
        ...filterPrereleases(packageVersions, ['alpha']),
      ];
    } else if (nextVersion.prerelease === 'beta') {
      allowedVersions = [
        ...allowedVersions,
        ...filterPrereleases(packageVersions, ['alpha', 'beta']),
      ];
    } else if (nextVersion.prerelease === 'rc') {
      allowedVersions = [
        ...allowedVersions,
        ...filterPrereleases(packageVersions, ['alpha', 'beta', 'rc']),
      ];
    } else if (nextVersion.prerelease === 'next') {
      allowedVersions = [
        ...allowedVersions,
        ...filterPrereleases(packageVersions, ['next']),
      ];
    } else {
      allowedVersions = packageVersions;
    }
    prevVersionForChangelog = searchLatestBeforeVersion(
      allowedVersions,
      nextVersion.version
    );
  }
  return prevVersionForChangelog;
}
