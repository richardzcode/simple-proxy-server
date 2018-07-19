var httpProxy = require('http-proxy');
var argv = require('yargs')
      .usage('node $0 [options]')
      .alias('t', 'target')
      .describe('t', 'target server endpoint')
      .alias('h', 'header')
      .describe('h', 'http header: --header Content-Type application/json')
      .nargs('h', 2)
      .alias('p', 'port')
      .describe('port', 'proxy server port')
      .default('port', 5050)
      .required('target', 'must provide target server endpoint')
      .argv;

var headers = [];
if (argv.header) {
  for (var i = 1; i < argv.header.length; i=i+2) {
    var name = argv.header[i-1];
    var value = argv.header[i];
    headers.push({ name, value });
  }
}

var proxy = httpProxy.createProxyServer({
  target: 'https://gobook.corp.linkedin.com',
  changeOrigin: true,
  secure: false
}).listen(argv.port);

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  headers.forEach(header => {
    //proxyReq.setHeader('Cookie', 'pluto_secure_session=92b2029b-7160-427f-8746-502711ede48f');
    proxyReq.setHeader(header.name, header.value);
  });
});

console.log('proxy server running on localhost port ' + argv.port);
console.log('target to ' + argv.target);
headers.forEach(header => {
  console.log('    ' + header.name + ': ' + header.value);
});
