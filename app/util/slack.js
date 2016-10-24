'use strict';

const cheerio = require('cheerio');
const co = require('co');
const R = require('ramda');
const thunkify = require('thunkify-wrap');
const request = thunkify(require('request'));
const req = require('request');
const HttpError = require('./httpError');

const loginFormPath = '/?no_sso=1';
const emojiUploadFormPath = '/admin/emoji';
const emojiUploadImagePath = '/customize/emoji';

const emojiExists = ($, name, i, elem) => $(elem).text().replace(/\s|:|`/g, '') === name;

/**
 * Initialize a new `Slack`.
 */
function Slack(data) {
  if (!(this instanceof Slack)) return new Slack(data);
  this.opts = data;

  /**
   * Do everything.
   */
  this.import = function *(emojis) {
    this.opts.emojis = emojis;
    console.log('Getting emoji page');

    for (var i = 0; i < Object.keys(this.opts.emojis).length; i++) {
      var e = this.opts.emojis[i];
      var uploadRes = yield this.upload(e.name, e.src);
      var $ = cheerio.load(uploadRes);
      const uploaded = R.curry(emojiExists)($, e.name);
      var uploadWorked = $('.emoji_row > td:nth-child(2)', '#custom_emoji').is(uploaded);
      if(!uploadWorked) {
        throw new HttpError(200, "Error occurred while uploading your requested emoji. Some possible reasons:\
\n\t- The url must refer to an image\
\n\t- The image cannot require authentication\
\n\t- The image cannot be too large\
\nIf you don't think any of these cases applies to you, give a shout to Molly to let her know something weird is happening! :alarm:");
      }
    }
    console.log('Uploaded emojis');
    return 'Success';
  };

  this.init = function *() {
    try {
      console.log('Starting import');
      yield this.tokens();
      console.log('Got tokens');
      yield this.login();
      console.log('Logged in');
      yield this.emoji();
    }
    catch (e) {
      console.log('Uh oh! ' + e);
      throw e;
    }
  }

  /**
   * Get login page (aka credentials).
   */
  this.tokens = function *() {
    var opts = this.opts;
    opts.jar = opts.jar || { _jar: { store: { idx: {} } } };
    var load = {
      url: opts.url + loginFormPath,
      jar: opts.jar,
      method: 'GET'
    };
    var res = yield request(load);
    var $ = cheerio.load(res[0].body);
    opts.formData = {
      signin: $('#signin_form input[name="signin"]').attr('value'),
      redir: $('#signin_form input[name="redir"]').attr('value'),
      crumb: $('#signin_form input[name="crumb"]').attr('value'),
      remember: 'on',
      email: opts.email,
      password: opts.password
    };
    if (!opts.formData.signin && !opts.formData.redir && !opts.formData.crumb) throw new Error('Login error: could not get login form for ' + opts.url);
    return this.opts = opts;
  };

  /**
   * Log in to Slack and populate cookies.
   */
  this.login = function *() {
    var opts = this.opts;
    var load = {
      url: opts.url + loginFormPath,
      jar: opts.jar,
      method: 'POST',
      followAllRedirects: true,
      formData: opts.formData
    };
    var res = yield request(load);
    return this.opts = opts;
  };

  /**
   * Get the emoji upload page.
   */
  this.emoji = function *() {
    var opts = this.opts;
    var load = {
      url: opts.url + emojiUploadFormPath,
      jar: opts.jar,
      method: 'GET'
    };
    var res = yield request(load);
    var $ = cheerio.load(res[0].body);
    opts.uploadCrumb = $('#addemoji > input[name="crumb"]').attr('value');
    console.log("Upload crumb is %s", opts.uploadCrumb);
    if (!opts.uploadCrumb) throw new Error('Login error: could not get emoji upload crumb for ' + opts.url);
    return this.opts = opts;
  };

  /**
   * Upload the emoji.
   */
  this.upload = function *(name, emoji) {
    console.log('Attempting to upload %s with %s', name, emoji);
    var opts = this.opts;
    var load = {
      url: opts.url + emojiUploadFormPath,
      jar: opts.jar,
      method: 'GET'
    };
    var res = yield request(load);
    var $ = cheerio.load(res[0].body);
    
    // TODO: also check non-custom emojis?
    const alreadyExists = R.curry(emojiExists)($, name);
    var duplicate = $('.emoji_row > td:nth-child(2)', '#custom_emoji').is(alreadyExists);
    if(duplicate) {
      throw new HttpError(200, "Oops, looks like an emoji with that name already exists: :" + name + ": Try again with a different name. :yes2:")
    }

    return new Promise(function(resolve, reject, notify) {
      var opts = this.opts;
      var r = req({
        url: opts.url + emojiUploadImagePath,
        method: 'POST',
        jar: opts.jar,
        followAllRedirects: true
      }, function(err, res, body) {
        if (err || !body) return reject(err);
        resolve(body);
      });
      var form = r.form();
      form.append('add', '1');
      form.append('crumb', opts.uploadCrumb);
      form.append('name', name);
      form.append('mode', 'data');
      form.append('img', req(emoji));
    }.bind(this));
  };

  co(this.init());

}

module.exports = Slack;
