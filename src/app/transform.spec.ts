import { Observable } from 'rxjs/Observable';
import { transform } from './transform';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/toPromise';

const fixture = require('./transform.fixture');

describe('transform', () => {
  it('should correctly transform the given element', async () => {
    const arr = await transform(Observable.from(fixture))
      .toArray()
      .toPromise();
    expect(arr).toMatchSnapshot();
  });
});
