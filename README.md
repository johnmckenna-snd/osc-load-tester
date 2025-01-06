# OSC Load Tester

I wanted to call this the OSC Blaster, but the more descriptive name prevailed. It does what it says: it allows one to load test an OSC Endpoint.

It's not perfect yet. It's very basic.

## Install and Run

Clone down the repo and then using a command line `cd` into that directory. You need `node.js` to run it.

```bash
npm i

# make an environemtn file
cp TEMPLATE.ENV .env

# adjust variables if you'd like
nano .env

# run it!!
npm start
```