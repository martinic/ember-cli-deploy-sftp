/* eslint-env node */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var Sftp             = require('ssh2-sftp-client');
var fs               = require('fs');

module.exports = {
  name: 'ember-cli-deploy-sftp',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      defaultConfig: {
        host: function(context) {
          return context.host;
        },
        port: function(context) {
          return context.port || 22;
        },
        remoteUser: function(context) {
          return context.remoteUser || 'root';
        },
        remoteDir: function(context) {
          return context.remoteDir;
        },
        distDir: function(context) {
          return context.distDir;
        },
        privateKey: function(context) {
          return context.privateKey;
        },
        passphrase: function(context) {
          return context.passphrase;
        },
        agent: function(context) {
          return context.agent;
        },
        password: function(context) {
          return context.password;
        }
      },

      upload: async function(/* context */) {
        this.log('Start Upload', { color: 'green' });
        var options = {
          host: this.readConfig('host'),
          port: this.readConfig('port'),
          username: this.readConfig('remoteUser'),
          privateKey: this.readConfig('privateKey') && fs.readFileSync(this.readConfig('privateKey')),
          agent: this.readConfig('agent'),
          password: this.readConfig('password'),
          passphrase: this.readConfig('passphrase')
        }
        const client = new Sftp();

        try {
          await client.connect(options);
          client.on('upload', info => {
            this.log(`Uploading ${info.source}`);
          });
          let rslt = await client.uploadDir(this.readConfig('distDir'), this.readConfig('remoteDir'));
          this.log('Upload Completed', { color: 'green' });
          return rslt;
        } catch (err) {
          this.log(err);
        } finally {
          client.end();
        }
      },
    });
    return new DeployPlugin();
  }
};
