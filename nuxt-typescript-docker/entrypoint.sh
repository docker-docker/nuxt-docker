#!/bin/bash

pm2 start ecosystem.config.js --watch
pm2 save
