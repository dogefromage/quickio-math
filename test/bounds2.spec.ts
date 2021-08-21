import { expect } from 'chai'
import 'mocha'

import { Bounds2 } from '../src/bounds2'

import { epsilon } from '../src/constants'
import { Ray2 } from '../src/ray2'
import { vec2 } from '../src/vec2'

describe('Bounds2', () => 
{
    it('fixesOrder', () => 
    {
        const bounds = new Bounds2(
            new vec2(-5, 1),
            new vec2(5, -2),
            true
        );

        expect(bounds.min.x).to.equal(-5);
        expect(bounds.min.y).to.equal(-2);
        expect(bounds.max.x).to.equal(5);
        expect(bounds.max.y).to.equal(1);
    })

    it('getsArea', () =>
    {
        let b = new Bounds2(vec2.one, new vec2(5, 3));

        expect(b.getArea()).to.equal(8);
    })

    it('intersectsBounds', () =>
    {
        const a = new Bounds2(new vec2(-5, -4), new vec2(5, 3));
        const b = new Bounds2(vec2.one, new vec2(5, 3));
        const c = new Bounds2(new vec2(5, 4), new vec2(6, 5));

        expect(a.intersectsBounds2(b)).to.equal(true);
        expect(a.intersectsBounds2(c)).to.equal(false);
    });

    it('intersectsRay', () =>
    {
        const a = new Bounds2(new vec2(-5, -4), new vec2(5, 3));
        
        const r1 = new Ray2(new vec2(10, 10), new vec2(1, 1));

        const r2 = new Ray2(new vec2(10, 10), new vec2(1, -1));

        expect(a.intersectsRay(r1)).to.equal(true);
        expect(a.intersectsRay(r2)).to.equal(false);
    });

    it('containsPoint', () =>
    {
        const a = new Bounds2(new vec2(-5, -4), new vec2(5, 3));

        expect(a.containsPoint(new vec2(0, 0))).to.equal(true);
        expect(a.containsPoint(new vec2(10, -20))).to.equal(false);
    });
})
