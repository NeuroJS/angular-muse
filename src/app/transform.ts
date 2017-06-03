import { Observable } from 'rxjs/Observable';
import { EEGReading } from 'muse-js';

import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/mergeMap';

export function transform(data: Observable<EEGReading>) {
  return Observable.from(data)
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
