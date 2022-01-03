# NEST TEST MICROSERVICE (NETEST)

CLI for testing the NestJS microservices transport layer. Also read the Nestjs documentation [here](https://docs.nestjs.com/microservices/basics).

## Transport Layer Support

* TCP
* REDIS

## Installing

```shell script#
sudo yarn add global @ryanbekhen/nest-test-microservice # yarn package manager

sudo npm i -g @ryanbekhen/nest-test-microservice # npm package manager
```

## Example Use

```bash
# generate config server
netest g redis example-server

# run tester
netest r example-server/example-pattern.json
```

## Contributing

Questions, comments, bug reports, and pull requests are all welcome.