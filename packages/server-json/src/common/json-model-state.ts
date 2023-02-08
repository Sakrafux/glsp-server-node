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
import { AnyObject, DefaultModelState, TypeGuard } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { JsonModelIndex } from './json-model-index';

@injectable()
export abstract class JsonModelState<T extends AnyObject> extends DefaultModelState {
    @inject(JsonModelIndex)
    override readonly index: JsonModelIndex;

    protected _modelSource: T;

    public get modelSource(): T {
        return this._modelSource;
    }

    protected set modelSource(source: T) {
        this._modelSource = source;
    }

    /**
     *
     */
    abstract readonly sourceModelTypeGuard: TypeGuard<T>;

    updateModelSource(source: T): void {
        this.modelSource = source;
        this.indexModelSource();
    }

    /**
     * Processes the JSON `sourceModel` and adds the model elements to the semantic {@link index}.
     * After execution  all semantic elements that are relevant for the graphical model generation
     * and/or operations should be  part of the index i.e. they have to be available for look-up.
     * The actual implemenation naturally depends on the actual source model. Typically a hierarchial
     * model is used and starting from the model root all child elements are traversed and indexed recursively.
     *
     * All semantic elements that should be added to the index need to be `Identifiable` i.e. they have to provide a stable
     * `id` property. If this is not already the case the elements need to adapted/augmented with an `id`.
     */
    protected abstract indexModelSource(): void;
}
