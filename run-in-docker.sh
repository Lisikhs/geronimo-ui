#!/bin/bash

function verifyDockerInstalled() {
  docker -v
  if [ $? -ne 0 ]; then
    echo Please install docker on your machine to run the app
    exit -1
  fi
}

function buildAndRunImage() {
  docker build . -t alisiikh/geronimo-ui && docker run -p 8080:80 alisiikh/geronimo-ui
}

verifyDockerInstalled
buildAndRunImage
