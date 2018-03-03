FROM alisiikh/node:9.7.1 as builder
COPY . /app
WORKDIR /app
RUN rm -rf node_modules &&\
 npm install &&\
 npm run lint &&\
 npm run test &&\
 npm run build

FROM alisiikh/nginx:1.13.9-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
