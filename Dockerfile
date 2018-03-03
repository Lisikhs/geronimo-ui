FROM alisiikh/node:alpine as app_build
COPY . /app
WORKDIR /app
ENV PHANTOMJS_BIN /app/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs
RUN rm -rf node_modules && \
 npm install && \
 npm run lint && \
 npm run test && \
 npm run build

FROM alisiikh/nginx:alpine
COPY --from=app_build /app/dist /usr/share/nginx/html
EXPOSE 80
