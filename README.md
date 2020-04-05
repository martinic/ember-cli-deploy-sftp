# Ember-cli-deploy-sftp

> An ember-cli-deploy-plugin to upload an Ember App via SFTP.

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-sftp.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

This plugin uploads an Ember App via SFTP to the server.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start

To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build-plus][2] is installed and configured.

- Install this plugin

```bash
$ ember install ember-cli-deploy-sftp
```

- Place the following configuration into `config/deploy.js`

```javascript
module.exports = function(deployTarget) {
  var ENV = { };

  if (deployTarget === 'production') {
    ENV.sftp = {
      host: 'server.com',
      remoteDir: '/home/server/http-docs/sftptest',
      remoteUser: process.env.remoteUser,
      privateKey: process.env.privateKey
    };
  }

  return ENV;
};
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-sftp
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `upload`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### host (`required`)

Remote server IP/Hostname.
 - `'server.com'`

*Default:* `undefined`

### port

SFTP port.

*Default:* `22`

### remoteUser (`required`)

Remote server username.

*Default:* `'root'`

### remoteDir (`required`)

Remote directory where files are going to be uploaded.
 - `'/home/server/http-docs/sftptest'`

*Default:* `undefined`

### distDir

The root directory where the files will be searched for. By default, this option will use the `distDir` property of the deployment context, provided by [ember-cli-deploy-build-plus][2].

*Default:* `context.distDir`

### privateKey

RSA key file. You must upload a public key to the remote server before attempting to upload any content.
 - `'/Users/User1/.ssh/id_rsa'`

 Either this option, `agent` or `password` must be set.

*Default:* `undefined`


### passphrase

For passphrase protected privateKeys.

 If you pass this value `privateKey` must be set.

*Default:* `undefined

### agent

Path to ssh-agent's UNIX socket for ssh-agent-based user authentication (when your private keys are loaded into your agent). You must upload a public key to the remote server before attempting to upload any content. Windows users: set to 'pageant' for authenticating with Pageant or (actual) path to a cygwin "UNIX socket."
 - `process.env.SSH_AUTH_SOCK`

 Either this option, `privateKey` or `password` must be set.

*Default:* `undefined`

### password

Password for `remoteUser`. Either this option, `agent` or `privateKey` must be set.

*Default:* `undefined`


## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`      (provided by [ember-cli-deploy-build-plus][2])

## Issues

You can use the [issue tracker][3] to provide feedback, suggest features or report bugs.

## Running Tests

- `npm test`

## Credits

Thanks to all our wonderful contributors, [here](https://github.com/martinic/ember-cli-deploy-sftp/graphs/contributors).

## Changelog
* **0.1.3**
  -  Added passphase option for privateKey [#4](https://github.com/martinic/ember-cli-deploy-sftp/pull/4)
* **0.1.2**
  - Add `agent` option [#3](https://github.com/martinic/ember-cli-deploy-sftp/pull/3)
* **0.1.1**
  - Add password option [#2](https://github.com/martinic/ember-cli-deploy-sftp/pull/2)
* **0.1.0**
  - First release
* **0.1.0-beta.1**
  - rename username to remoteUser and update README.md


[1]: http://ember-cli-deploy.com/ "Plugin Documentation"
[2]: https://github.com/martinic/ember-cli-deploy-build-plus "ember-cli-deploy-build-plus"
[3]: https://github.com/martinic/ember-cli-deploy-sftp/issues "issue tracker"
