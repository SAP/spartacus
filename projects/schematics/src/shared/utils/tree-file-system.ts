/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { normalize, resolve } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import * as path from 'path';
import { FileSystemHost, RuntimeDirEntry, ts } from 'ts-morph';

export class TreeFileSystem implements FileSystemHost {
  constructor(
    private readonly tree: Tree,
    private readonly rootDir: string
  ) {}

  private resolvePath(filePath: string) {
    return normalize(resolve(normalize(this.rootDir), normalize(filePath)));
  }

  isCaseSensitive(): boolean {
    return ts.sys.useCaseSensitiveFileNames;
  }

  async delete(filePath: string): Promise<void> {
    return this.deleteSync(filePath);
  }

  deleteSync(filePath: string): void {
    return this.tree.delete(filePath);
  }

  readDirSync(dirPath: string): RuntimeDirEntry[] {
    const entries: RuntimeDirEntry[] = [];

    const dir = this.tree.getDir(dirPath);

    dir.subfiles.forEach((file) => {
      entries.push({
        isDirectory: false,
        isSymlink: false,
        name: path.join(dirPath, file.toString()),
        isFile: true,
      });
    });

    dir.subdirs.forEach((subDir) => {
      entries.push({
        isDirectory: true,
        isSymlink: false,
        name: path.join(dirPath, subDir.toString()),
        isFile: false,
      });
    });

    return entries;
  }

  async readFile(
    filePath: string,
    encoding?: BufferEncoding | undefined
  ): Promise<string> {
    return this.readFileSync(filePath, encoding);
  }

  readFileSync(
    filePath: string,
    encoding?: BufferEncoding | undefined
  ): string {
    const result = this.tree
      .get(this.resolvePath(filePath))
      ?.content.toString(encoding);
    if (result) {
      return result;
    }
    return '';
  }

  async writeFile(filePath: string, fileText: string): Promise<void> {
    return this.writeFileSync(filePath, fileText);
  }

  writeFileSync(filePath: string, fileText: string): void {
    if (this.fileExistsSync(filePath)) {
      const currentContent = this.readFileSync(filePath);
      // prevent the unnecessary Angular logs about the files being updated
      if (currentContent === fileText) {
        return;
      }
    }

    return this.tree.overwrite(filePath, fileText);
  }

  async mkdir(dirPath: string): Promise<void> {
    return this.mkdirSync(dirPath);
  }

  mkdirSync(dirPath: string): void {
    if (this.tree.exists(`${dirPath}/.gitkeep`)) {
      return;
    }
    return;
  }

  async move(srcPath: string, destPath: string): Promise<void> {
    return this.moveSync(srcPath, destPath);
  }

  moveSync(srcPath: string, destPath: string): void {
    return this.tree.rename(srcPath, destPath);
  }

  async copy(srcPath: string, destPath: string): Promise<void> {
    return this.copySync(srcPath, destPath);
  }

  copySync(_srcPath: string, _destPath: string): void {
    throw new Error('Method `copySync` not implemented in TreeFileSystem.');
  }

  async fileExists(filePath: string): Promise<boolean> {
    return this.fileExistsSync(filePath);
  }

  fileExistsSync(filePath: string): boolean {
    return this.tree.exists(filePath);
  }

  async directoryExists(dirPath: string): Promise<boolean> {
    return this.directoryExistsSync(dirPath);
  }

  directoryExistsSync(dirPath: string): boolean {
    return this.tree.exists(dirPath);
  }

  realpathSync(filePath: string): string {
    const result = normalize(
      resolve(normalize(this.rootDir), normalize(filePath))
    );
    return result;
  }

  getCurrentDirectory(): string {
    return this.tree.root.path.toString();
  }

  glob(_patterns: readonly string[]): Promise<string[]> {
    throw new Error('Method `glob` not implemented in TreeFileSystem.');
  }

  globSync(_patterns: readonly string[]): string[] {
    throw new Error('Method `globSync` not implemented in TreeFileSystem.');
  }
}
