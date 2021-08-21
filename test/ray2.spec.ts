import { expect } from 'chai'
import 'mocha'

import { Ray2 } from './../src/ray2'

import { epsilon } from '../src/constants'
import { vec2 } from '../src/vec2'

describe('Ray2', () => {

  it('isParallel', () => 
  {
    const one = new Ray2(new vec2(1, 0), new vec2(1, 3));
    const two = new Ray2(new vec2(0, 5), new vec2(-2, -6));

    let isParallel = one.isParallel(two);

    expect(isParallel).to.equal(true);
  });

  it ('angleTo', () =>
  {
    const one = new Ray2(new vec2(1, 0), new vec2(1, 2));
    const two = new Ray2(new vec2(3, -5), new vec2(-6, -6));

    let angle = one.angleTo(two);

    expect(angle).to.equal(2.8198420119289453);
  })
})
