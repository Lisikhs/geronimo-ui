FROM alisiikh/node:alpine as app_build
COPY . /app
WORKDIR /app
RUN rm -rf node_modules && npm install && npm run ng build --prod

FROM alisiikh/nginx:alpine
COPY --from=app_build /app/dist /usr/share/nginx/html
EXPOSE 80
