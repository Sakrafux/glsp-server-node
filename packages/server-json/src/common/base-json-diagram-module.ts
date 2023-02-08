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
import { AnyObject, applyBindingTarget, BindingTarget, DiagramModule, GModelIndex } from '@eclipse-glsp/server';
import { injectable, interfaces } from 'inversify';
import { JsonModelIndex } from './json-model-index';
import { JsonModelState } from './json-model-state';

/**
 * Base extension of the {@link DiagramModule} to provide integration for arbitrary (identifiable ) JSON models.
 *
 * Contains all bindings of {@link DiagramModule}.
 *
 * Additionally binds:
 * - {@link ModelState} to an instance of{@link JsonModelState}
 * - {@link GModelIndex} to {@link JsonModelIndex}
 * - {@link JsonModelIndex} to {@link JsonModelIndex}
 */
@injectable()
export abstract class BaseJsonDiagramModule extends DiagramModule {
    protected override configure(
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind
    ): void {
        super.configure(bind, unbind, isBound, rebind);
        const context = { bind, isBound };
        applyBindingTarget(context, GModelIndex, this.bindGModelIndex()).inSingletonScope();
    }

    protected abstract override bindModelState(): BindingTarget<JsonModelState<AnyObject>>;

    /**
     * Overwriting is discouraged. Subclasses that want to customize the model state implementation should
     * overwrite  {@link bindJsonModelIndex} instead
     */
    protected override bindGModelIndex(): BindingTarget<GModelIndex> {
        return {
            service: JsonModelIndex,
            autoBind: false
        };
    }

    /**
     * Returns the {@link BindingTarget} for the {@link JsonModelIndex} class.
     * If overridden typically a {@link ServiceTarget} is returned as this ensures that both
     * `@inject(GModelIndex)` and `@inject MyCustomJsonModelIndex)` can be used and resolve
     * to the same instance.
     *
     * Example:
     * ```ts
     *  protected override bindJsonModelIndex():BindingTarget<JsonModelIndex> {
     *     return { service: MyCustomJsonModelIndex};
     *  }
     *```
     */
    protected bindJsonModelIndex(): BindingTarget<JsonModelIndex> {
        return {
            service: JsonModelIndex
        };
    }
}
