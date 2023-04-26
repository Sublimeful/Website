from alpine

expose 3000

run apk add nodejs && \
    apk add npm;

workdir /app

copy . .

run npm install -g serve && \
    npm install && \
    npm run build;

CMD ["serve", "-s", "build"]
