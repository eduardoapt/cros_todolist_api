FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY swaggerConfig.ts ./
COPY prisma ./prisma
COPY src ./src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
