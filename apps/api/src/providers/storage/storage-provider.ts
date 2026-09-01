export type StoredObject = { key: string; contentType: string; size: number };
export interface StorageProvider {
  putPrivate(input: { key: string; bytes: Uint8Array; contentType: string }): Promise<StoredObject>;
  deletePrivate(key: string): Promise<void>;
}
