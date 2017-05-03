/* eslint-env node */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var Sftp             = require('sftp-upload');
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
        username: function(context) {
          return context.username || 'root';
        },
        remoteDir: function(context) {
          return context.remoteDir;
        },
        distDir: function(context) {
          return context.distDir;
        },
        privateKey: function(context) {
          return context.privateKey;
        }
      },

      upload: function(/* context */) {
        var options = {
          host: this.readConfig('host'),
          port: this.readConfig('port'),
          username: this.readConfig('username'),
          path: this.readConfig('distDir'),
          remoteDir: this.readConfig('remoteDir'),
          privateKey: fs.readFileSync(this.readConfig('privateKey'))
        },
        sftp = new Sftp(options);

        sftp.on('error', function(err){
          this.log(err);
        })
        .on('uploading', function(pgs){
          this.log('Uploading', pgs.file);
          this.log(pgs.percent+'% completed');
        })
        .on('completed', function(){
          this.log('Upload Completed');
        })
        .upload();
      },
    });
    return new DeployPlugin();
  }
};
