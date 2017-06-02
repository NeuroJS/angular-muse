import { Observable } from 'rxjs/Rx';
import { EEGReading } from 'muse-js';

export function transform(data) {
  return Observable.of(data)
    .mergeMap(e => e)
    .bufferCount(5)
    .mergeMap((electrodes: EEGReading[]) =>
      electrodes.reduce((samples, electrode) =>
        samples.map((sample, index) => ({
          timestamp: electrode.timestamp,
          channelData: [...sample.channelData, electrode.samples[index]]
        })),
        electrodes[0].samples.map(() => ({ channelData: [] })))
    );
}
