/********************************************************************************
 * Copyright (c) 2023 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { GNode } from '@eclipse-glsp/server';
import { expect } from 'chai';
import { Identifiable } from './identifiable';
import { JsonModelIndex } from './json-model-index';

type TestIdentifiable = Identifiable & { subProp: true };

function isTestIdentifiable(object: unknown): object is TestIdentifiable {
    return Identifiable.is(object) && 'subProp' in object && object.subProp === true;
}
describe('test JsonModelIndex', () => {
    const index = new JsonModelIndex();
    const expected: TestIdentifiable = { id: 'someId', subProp: true };
    index['semanticIndex'].set(expected.id, expected);

    describe('indexSemantic', () => {
        afterEach(() => {
            index['semanticIndex'].set(expected.id, expected);
        });
        it('should add element to index', () => {
            const newElement = { id: 'newElement' };
            index.indexSemantic(newElement);
            expect(index['semanticIndex']).to.include(newElement);
        });
        it('should add element to index and override existing', () => {
            const newElement = { id: expected.id, discriminator: true };
            index.indexSemantic(newElement, true);
            expect(index['semanticIndex']).to.not.include(expected);
            expect(index['semanticIndex']).to.include(newElement);
        });
        it('should not add element to index and throw an error', () => {
            const newElement = { id: expected.id, discriminator: true };
            expect(() => index.indexSemantic(newElement)).to.throw();
            expect(index['semanticIndex']).to.include(expected);
            expect(index['semanticIndex']).to.not.include(newElement);
        });
    });

    describe('findSemantic', () => {
        it('should return `undefined` for non-existing id', () => {
            const actual = index.findSemantic('notExisting');
            expect(actual).to.be.undefined;
        });
        it('should return matching element for existing id', () => {
            const actual = index.findSemantic(expected.id);
            expect(actual).to.be.equal(expected);
        });
        it('should return matching element for GmodeElement with existing id', () => {
            const actual = index.findSemantic(GNode.builder().id(expected.id).build());
            expect(actual).to.be.equal(expected);
        });
        it('should return matching element for existing id and matching guard', () => {
            const actual = index.findSemantic(expected.id, isTestIdentifiable);
            expect(actual).to.be.deep.equal(expected);
        });
        it('should return undefined for existing id & not matching guard', () => {
            const actual = index.findSemantic(expected.id, (obj: unknown): obj is Identifiable => false);
            expect(actual).to.be.undefined;
        });
    });

    describe('getSemantic', () => {
        it('should throw error for non-existing id', () => {
            expect(() => index.getSemantic('nonExisting')).to.throw();
        });
        it('should return matching element for existing id', () => {
            const actual = index.getSemantic(expected.id);
            expect(actual).to.be.equal(expected);
        });
        it('should return matching element for GmodeElement with existing id', () => {
            const actual = index.getSemantic(GNode.builder().id(expected.id).build());
            expect(actual).to.be.equal(expected);
        });
        it('should return matching element for existing id and matching guard', () => {
            const actual = index.getSemantic(expected.id, isTestIdentifiable);
            expect(actual).to.be.deep.equal(expected);
        });
        it('should throw error for existing id & not matching guard', () => {
            expect(() => index.getSemantic(expected.id, (obj: unknown): obj is Identifiable => false)).to.throw();
        });
    });
});
