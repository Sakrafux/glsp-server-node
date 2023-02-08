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

import { GLSPServerError, GModelElement, GModelIndex, TypeGuard } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { Identifiable } from './identifiable';

/**
 * Is used to index all child elements of an arbitrary (identifiable) JSON source model (semantic model).
 * Offers a set of query methods retrieve indexed elements.
 * Typically it's the responsibility of the {@link SourceModelStorage} implementation to index the source model elements
 */
@injectable()
export class JsonModelIndex extends GModelIndex {
    protected semanticIndex: Map<string, Identifiable>;

    constructor() {
        super();
        this.semanticIndex = new Map();
    }

    indexSemantic(element: Identifiable, allowOverride = false): void {
        if (!allowOverride && this.semanticIndex.has(element.id)) {
            throw new GLSPServerError(`Could not index semantic element. Another element with id ${element.id} is already indexed`);
        }
        this.semanticIndex.set(element.id, element);
    }

    findSemantic(id: string): Identifiable | undefined;
    findSemantic(element: GModelElement): Identifiable | undefined;
    findSemantic<T extends Identifiable>(id: string, guard: TypeGuard<T>): T | undefined;
    findSemantic<T extends Identifiable>(element: GModelElement, guard: TypeGuard<T>): T | undefined;
    findSemantic(idOrElement: string | GModelElement, guard?: TypeGuard<Identifiable>): Identifiable | undefined {
        const id = typeof idOrElement === 'string' ? idOrElement : idOrElement.id;
        const element = this.semanticIndex.get(id);
        return !guard ? element : guard(element) ? element : undefined;
    }

    getSemantic(id: string): Identifiable;
    getSemantic(element: GModelElement): Identifiable;
    getSemantic<T extends Identifiable>(id: string, guard: TypeGuard<T>): T;
    getSemantic<T extends Identifiable>(element: GModelElement, guard: TypeGuard<T>): T;
    getSemantic(idOrElement: string | GModelElement, guard?: TypeGuard<Identifiable>): Identifiable {
        const id = typeof idOrElement === 'string' ? idOrElement : idOrElement.id;
        const element = this.semanticIndex.get(id);
        if (!element) {
            throw new GLSPServerError(`Could not find semantic element with id :${id}`);
        }
        if (guard && !guard(element)) {
            throw new GLSPServerError(`Element with id '${id}' is not of the expected type`);
        }
        return element;
    }

    override clear(): void {
        super.clear();
        this.semanticIndex.clear();
    }
}
