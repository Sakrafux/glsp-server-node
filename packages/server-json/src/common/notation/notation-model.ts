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
import { Args, Dimension, Point } from '@eclipse-glsp/server';
import { Identifiable } from '../identifiable';
/**
 * A basic generic model to store notation information for the graphical representation
 * of semantic elements
 */

/**
 * The root model element that stores all {@link NotationElement}s.
 */
export interface Diagram extends NotationElement {
    elements: NotationElement[];
    diagramType?: string;
}

export interface NotationElement<SemanticElement = Identifiable> {
    semanticElement: string | SemanticElement;
    args?: Args;
}

export interface ResolvedNotationElement<SemanticElement = Identifiable> extends NotationElement<SemanticElement> {
    semanticElement: SemanticElement;
}

export interface Shape<SemanticElement = Identifiable> extends ResolvedNotationElement<SemanticElement> {
    position: Point;
    size: Dimension;
}

export interface Edge<SemanticElement = Identifiable> extends ResolvedNotationElement<SemanticElement> {
    bendPoints: Point;
    source: string | NotationElement;
    target: string | NotationElement;
}

export interface ResolvedEdge<SemanticElement = Identifiable> extends Edge<SemanticElement>, ResolvedNotationElement<SemanticElement> {
    source: NotationElement;
    target: NotationElement;
}
