FROM node:15.11.0-buster-slim
ENV TIMEZONE=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime && echo $TIMEZONE > /etc/timezone

VOLUME /opt/index
EXPOSE 3000

RUN yarn global add pm2
RUN pm2 startup
# COPY package.json .
# RUN yarn config set registry https://registry.npm.taobao.org
# RUN yarn
# RUN yarn build

WORKDIR /opt/index
ENV PORT="3000"
ENV NODE_ENV="production"
COPY entrypoint.sh /opt/index/
RUN chmod +x /opt/index/entrypoint.sh

ENTRYPOINT ["/opt/index/entrypoint.sh"]
