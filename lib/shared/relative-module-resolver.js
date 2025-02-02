/*
 * STOP!!! DO NOT MODIFY.
 *
 * This file is part of the ongoing work to move the eslintrc-style config
 * system into the @eslint/eslintrc package. This file needs to remain
 * unchanged in order for this work to proceed.
 *
 * If you think you need to change this file, please contact @nzakas first.
 *
 * Thanks in advance for your cooperation.
 */

/**
 * Utility for resolving a module relative to another module
 * @author Teddy Katz
 */

"use strict";

const { createRequire } = require("module");

module.exports = {

    /**
     * Resolves a Node module relative to another module
     * @param {string} moduleName The name of a Node module, or a path to a Node module.
     * @param {string} relativeToPath An absolute path indicating the module that `moduleName` should be resolved relative to. This must be
     * a file rather than a directory, but the file need not actually exist.
     * @returns {string} The absolute path that would result from calling `require.resolve(moduleName)` in a file located at `relativeToPath`
     */
    resolve(moduleName, relativeToPath) {
        try {
            return createRequire(relativeToPath).resolve(moduleName);
        } catch (error) {

            // This `if` block is for older Node.js than 12.0.0. We can remove this block in the future.
            if (
                typeof error === "object" &&
                error !== null &&
                error.code === "MODULE_NOT_FOUND" &&
                !error.requireStack &&
                error.message.includes(moduleName)
            ) {
                error.message += `\nRequire stack:\n- ${relativeToPath}`;
            }
            throw error;
        }
    }
};
