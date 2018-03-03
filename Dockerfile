FROM alisiikh/node:alpine as builder
COPY . /app
WORKDIR /app
#ENV PHANTOMJS_BIN /app/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs
RUN rm -rf node_modules &&\
 npm install &&\
 npm run lint &&\
# npm run test &&\
 npm run build

FROM alisiikh/nginx:alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
