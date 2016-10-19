

function upload() {
  // var user = yield Prompt.start();
  var user = {
      url: url("crosschx"),
      email: "molly.henderson+emojifier@crosschx.com",
      password: "Test1234"
  }
  // var pack = yield Pack.get(user.pack);
  // user.emojis = pack.emojis;
  user.emojis = [
      {
          name: "kitten",
          src: "http://static.boredpanda.com.rsz.io/blog/wp-content/uuuploads/cute-baby-animals-2/cute-baby-animals-2-2.jpg?mode=max&width=128&height=128"
      }
  ];
  var slack = new Slack(user, program.debug);
  yield slack.import();
  process.exit();
}


function url(subdomain) {
  return 'https://' + subdomain + '.slack.com';
}
