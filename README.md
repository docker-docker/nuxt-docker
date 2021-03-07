# nuxt-docker

A slim base version image for nuxt application

# How to use this `Dockerfile`

```shell

$ docker build -f Dockerfile -t test:nuxt .
$ docker run --name test -d -p 3000:3000 -v $PWD:/opt/app test:nuxt

```
