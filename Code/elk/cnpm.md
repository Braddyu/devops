FROM node
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install -g pm2
COPY ./code/reportjs /user/src/app
WORKDIR /user/src/app
RUN cnpm install
CMD ["npm","start"]
