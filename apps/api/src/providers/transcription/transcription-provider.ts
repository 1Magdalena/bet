export interface TranscriptionProvider {
  transcribe(input: { bytes: Uint8Array; contentType: string; language?: string }): Promise<{ text: string }>;
}
export class DisabledTranscriptionProvider implements TranscriptionProvider {
  async transcribe(): Promise<{ text: string }> { throw new Error('Transcription provider disabled'); }
}
