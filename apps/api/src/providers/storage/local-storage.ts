import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join, normalize } from 'node:path';
import type { StorageProvider, StoredObject } from './storage-provider.js';

export class LocalStorageProvider implements StorageProvider {
  constructor(private readonly root: string) {}
  private pathFor(key: string) {
    const safe = normalize(key).replace(/^([.][.][/\\])+/, '');
    return join(this.root, safe);
  }
  async putPrivate(input: { key: string; bytes: Uint8Array; contentType: string }): Promise<StoredObject> {
    const path = this.pathFor(input.key);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, input.bytes, { mode: 0o600 });
    return { key: input.key, contentType: input.contentType, size: input.bytes.byteLength };
  }
  async deletePrivate(key: string) { await rm(this.pathFor(key), { force: true }); }
}
