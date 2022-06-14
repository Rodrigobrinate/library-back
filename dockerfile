FROM node:alpine

WORKDIR /library
COPY package.json .
RUN npm install

COPY . .
RUN npx prisma generate
CMD npm start dev