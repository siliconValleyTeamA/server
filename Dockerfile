FROM node:14.15.4

RUN mkdir -p /app/
WORKDIR /app/

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]