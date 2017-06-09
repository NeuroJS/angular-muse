import { Observable } from 'rxjs/Observable';
import { EEGReading } from 'muse-js';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/mergeMap';

export interface SimpleEEGSample {
  timestamp: number;
  channelData: number[];
}

export function transform(data: Observable<EEGReading>): Observable<SimpleEEGSample> {
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
