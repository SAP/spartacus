import { normalize, resolve } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import * as path from 'path';
import { FileSystemHost, ts } from 'ts-morph';

export class TreeFileSystem implements FileSystemHost {
  constructor(private readonly tree: Tree, private readonly rootDir: string) {}

  private resolvePath(filePath: string) {
    return normalize(resolve(normalize(this.rootDir), normalize(filePath)));
  }

  isCaseSensitive(): boolean {
    return ts.sys.useCaseSensitiveFileNames;
  }

  async delete(path: string): Promise<void> {
    return this.deleteSync(path);
  }

  deleteSync(path: string): void {
    return this.tree.delete(path);
  }

  readDirSync(dirPath: string): string[] {
    const paths: string[] = [];
    this.tree
      .getDir(dirPath)
      .subfiles.forEach((file) =>
        paths.push(path.join(dirPath, file.toString()))
      );
    this.tree
      .getDir(dirPath)
      .subdirs.forEach((dir) => paths.push(path.join(dirPath, dir.toString())));
    return paths;
  }

  async readFile(
    filePath: string,
    encoding?: string | undefined
  ): Promise<string> {
    return this.readFileSync(filePath, encoding);
  }

  readFileSync(filePath: string, encoding?: string | undefined): string {
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
