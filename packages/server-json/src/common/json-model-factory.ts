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
 ************************ ********************************************************/
import { AnyObject, GGraph, GModelFactory, GModelRoot, ModelState, SOURCE_URI_ARG } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { JsonModelState } from './json-model-state';

/**
 * A graph model factory produces a graph model from the json source model in the model state.
 */
@injectable()
export abstract class JsonGModelFactory implements GModelFactory {
    @inject(ModelState)
    protected modelState: JsonModelState<AnyObject>;

    createModel(): void {
        const root = this.createRootElement();
        this.fillRootElement(root);
        this.modelState.updateRoot(root);
    }

    protected createRootElement(): GModelRoot {
        return GGraph.builder()
            .id(this.modelState.get(SOURCE_URI_ARG) ?? 'root')
            .build();
    }

    /**
     * Fills the new root element with a graph model derived from the source model.
     *
     * @param newRoot new graph model root
     */
    protected abstract fillRootElement(newRoot: GModelRoot): void;
}
