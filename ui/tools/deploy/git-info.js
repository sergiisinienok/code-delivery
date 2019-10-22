/**
 * Pipe basic Git info to stdout
 *
 * - short() => first 7 chars of SHA-1 hash of HEAD
 * - long() => full SHA-1 hash of HEAD
 * - branch() => current branch name
 * - tag() => nearest tag predating HEAD
 * - imageTag() => image tag from current branch
 */

'use strict';

const { execSync } = require('child_process');

// Cleanup stdout and return output from `cmd`
const cmd = (command) => execSync(command).toString('utf-8').split('\n').join('');

// Return first 7 chars of SHA-1 hash of HEAD
const short = () => cmd('git rev-parse --short HEAD');

// Return full SHA-1 hash of HEAD
const long = () => cmd('git rev-parse HEAD');

// Return current branch name
const branch = () => cmd('git rev-parse --abbrev-ref HEAD');

// Return nearest tag predating HEAD
const tag = () => cmd('git describe --always --tags --abbrev=7');

// Return docker image tag
const imageTag = () => process.env.IMAGE_TAG || tag().toLowerCase().replace('build-', '');

module.exports = {
  short,
  long,
  branch,
  tag,
  imageTag,
};
