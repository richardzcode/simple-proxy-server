# simple-proxy-server
Simple ready to work proxy server base on nodejs http-proxy

```
git clone https://github.com/richardzcode/simple-proxy-server.git
cd simple-proxy-server
npm install
```

Help
```
node app.js --help
```

Start Server
```
node app.js --target $target_endpoint$
```

Add Headers
```
node app.js --target $target_endpoint$ --header Content-Type application/json
```

Add Response Headers
```
node app.js --target $target_endpoint$ --response_header Access-Control-Allow-Origin '*' -H Access-Control-Allow-Methods 'POST, GET, OPTIONS'
```
