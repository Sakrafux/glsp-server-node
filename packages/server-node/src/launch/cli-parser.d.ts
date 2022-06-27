/********************************************************************************
 * Copyright (c) 2022 STMicroelectronics and others.
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
import { LogLevel } from '@eclipse-glsp/server-common';
import * as cmd from 'commander';
export interface LaunchOptions {
    logLevel: LogLevel;
    logDir?: string;
    fileLog: boolean;
    consoleLog: boolean;
}
export interface CliParser<O extends LaunchOptions = LaunchOptions> {
    command: cmd.Command;
    parse(argv?: string[]): O;
}
export declare const defaultLaunchOptions: Required<LaunchOptions>;
export declare function createCliParser<O extends LaunchOptions = LaunchOptions>(options?: LaunchOptions): CliParser<O>;
export declare function parse<T>(command: cmd.Command, defaultOptions: Partial<T>, argv?: string[]): T;
export declare function processLogLevel(value: string): LogLevel;
export declare function processLogDir(value: string): string;
export declare function isDirectory(value: string): boolean;
//# sourceMappingURL=cli-parser.d.ts.map