"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDirectory = exports.processLogDir = exports.processLogLevel = exports.parse = exports.createCliParser = exports.defaultLaunchOptions = void 0;
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
const server_common_1 = require("@eclipse-glsp/server-common");
const cmd = require("commander");
const fs = require("fs-extra");
const path = require("path");
exports.defaultLaunchOptions = {
    logLevel: server_common_1.LogLevel.info,
    logDir: '.config',
    consoleLog: true,
    fileLog: false
};
function createCliParser(options = exports.defaultLaunchOptions) {
    const command = new cmd.Command()
        .version('0.9.0')
        .description('GLSP server')
        .showHelpAfterError(true)
        .name('Launch a GLSP server')
        .option('-l , --logLevel <logLevel>', `Set the log level. [default='${options.logLevel}']`, processLogLevel, options.logLevel)
        .option('-d , --logDir <logDir>', `Set the directory for log files (when file logging is enabled) [default=${options.logDir}]`, processLogDir, options.logDir)
        .addHelpText('afterAll', '\n Copyright (c) 2022 Eclipse GLSP');
    return { command, parse: argv => parse(command, options, argv) };
}
exports.createCliParser = createCliParser;
function parse(command, defaultOptions, argv) {
    command.parse(argv);
    return Object.assign(Object.assign({}, defaultOptions), command.opts());
}
exports.parse = parse;
function processLogLevel(value) {
    const level = (0, server_common_1.asLogLevel)(value);
    if (!level) {
        throw new cmd.InvalidArgumentError("Argument has to be 'none'|'error'|'warn'|'info'|'debug'!");
    }
    return level;
}
exports.processLogLevel = processLogLevel;
function processLogDir(value) {
    const logDir = path.resolve(value);
    if (path.extname(logDir).length !== 0 || !isDirectory(path.dirname(logDir))) {
        throw new cmd.InvalidArgumentError('Argument is not a valid directory!');
    }
    return logDir;
}
exports.processLogDir = processLogDir;
function isDirectory(value) {
    try {
        return fs.statSync(value).isDirectory();
    }
    catch (error) {
        return false;
    }
}
exports.isDirectory = isDirectory;
//# sourceMappingURL=cli-parser.js.map