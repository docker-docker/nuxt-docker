FROM node:15.11.0-buster-slim

VOLUME /opt/app

RUN yarn global add pm2
RUN pm2 startup

# COPY package.json .
# RUN yarn config set registry https://registry.npm.taobao.org
# RUN yarn
# RUN yarn build

ENV PORT="3000"
ENV NODE_ENV="production"

EXPOSE 3000
WORKDIR /opt/app

RUN chmod +x /opt/app/entrypoint.sh
ENTRYPOINT ["/opt/app/entrypoint.sh"]
