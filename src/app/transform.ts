import { Observable } from 'rxjs/Rx';

export function transform (data) {
    console.log('Im hot');
    return Observable.of(data)
        .mergeMap(e => e)
        .bufferCount(500)
        .do(buffer => console.log(JSON.stringify(buffer)))
        //.groupBy((e: any) => e.timestamp, e => e.timestamp)
}
