var httpProxy = require('http-proxy');
var argv = require('yargs')
      .usage('node $0 [options]')
      .alias('t', 'target')
      .describe('t', 'target server endpoint')
      .alias('h', 'header')
      .describe('h', 'request header: --header Content-Type application/json')
      .nargs('h', 2)
      .alias('H', 'response_header')
      .describe('H', 'response header: --response_header Access-Control-Allow-Origin \'*\'')
      .nargs('H', 2)
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

var response_headers = [];
if (argv.response_header) {
  for (var i = 1; i < argv.response_header.length; i=i+2) {
    var name = argv.response_header[i-1];
    var value = argv.response_header[i];
    response_headers.push({ name, value });
  }
}

var proxy = httpProxy.createProxyServer({
  target: argv.target,
  changeOrigin: true,
  secure: false
}).listen(argv.port);

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  headers.forEach(header => {
    proxyReq.setHeader(header.name, header.value);
  });
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  response_headers.forEach(header => {
    res.setHeader(header.name, header.value);
  });
});

console.log('proxy server running on localhost port ' + argv.port);
headers.forEach(header => {
  console.log('    ' + header.name + ': ' + header.value);
});
console.log('target to ' + argv.target);
response_headers.forEach(header => {
  console.log('    ' + header.name + ': ' + header.value);
});
