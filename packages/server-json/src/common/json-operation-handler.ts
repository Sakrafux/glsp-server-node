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

import { AnyObject, Command, ModelState, OperationHandler, RecordingCommand } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { JsonModelIndex } from './json-model-index';
import { JsonModelState } from './json-model-state';

injectable();
export abstract class JsonOperationHandler extends OperationHandler {
    @inject(ModelState)
    protected override modelState: JsonModelState<AnyObject>;

    @inject(JsonModelIndex)
    protected index: JsonModelIndex;

    protected commandOf(runnable: () => void): Command {
        return new RecordingCommand(this.modelState.modelSource, runnable);
    }
}
