import { Observable } from 'rxjs/Rx';
import { transform } from './transform';

const fixture = require('./transform.fixture');

describe('transform', () => {
  it('should correctly transform the given element', async () => {
    const arr = [];
    await transform(Observable.from(fixture)).forEach(item => arr.push(item));
    expect(arr).toMatchSnapshot();
  });
});
