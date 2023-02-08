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
import {
    AbstractJsonModelStorage,
    AnyObject,
    MaybePromise,
    ModelState,
    RequestModelAction,
    SaveModelAction
} from '@eclipse-glsp/server/node';
import { inject, injectable } from 'inversify';
import { JsonModelState } from '../common';

@injectable()
export class JsonSourceModelStorage extends AbstractJsonModelStorage {
    @inject(ModelState)
    protected modelState: JsonModelState<AnyObject>;

    loadSourceModel(action: RequestModelAction): MaybePromise<void> {
        const sourceUri = this.getSourceUri(action);
    }

    saveSourceModel(action: SaveModelAction): MaybePromise<void> {
        throw new Error('Method not implemented.');
    }
}
