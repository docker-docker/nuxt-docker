## eslint configuration

In IDEA the default eslint configuration is disabled, you need to turn on it.From
**File | Settings | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint**, you need to check "**Automatic
EsLint Configuration**". After that, you can run the "**Fix ESLint Problems**" in any project folder with right click
options.

## pm2 script

```$shell
$ npm i pm2 -g

配置pm2开机启动脚本
$ pm2 startup 

```

```$shell
$ yarn 
$ yarn build

编译程序, 然后配置pm2程序
$ pm2 start  ecosystem.config.js --watch
$ pm2 save
```
