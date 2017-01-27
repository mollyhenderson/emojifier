`emojify <url> as <name>`

`aliasify <existing-emoji> as <name>`

Suggested improvements:
* Allow for gif emojis
* Support emojifying attachments

Setup:
* Create a heroku app at https://dashboard.heroku.com
* Clone this repo
* Push the repo up to the heroku app:
```bash
$ heroku git:remote -a <your-heroku-url>
Git remote heroku added.
$ git push heroku master
```
* Sign up as a new Slack user
* Set up an outgoing webhook for your Slack team (found at `https://<slack-team-name>.slack.com/apps/manage/custom-integrations`)
* Optionally choose a channel for Emojifier to listen on
* If you will be using trigger words, add them in the `Trigger Words` field separated by a comma
* Set the URL to `https://<your-heroku-url>.herokuapp.com/slack/emojify`
* Take note of the generated token
* Update the environment variables in heroku
```bash
$ heroku config:set SLACK_TOKEN=<token-from-above>
$ heroku config:set SLACK_URL=<slack-team-name>
$ heroku config:set SLACK_EMAIL=<email>
$ heroku config:set SLACK_PW=<password>
$ heroku config:set EMOJI_TRIGGER=<emoji-trigger>
$ heroku config:set ALIAS_TRIGGER=<alias-trigger>
```
