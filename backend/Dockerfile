FROM node:20

WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g tsx

EXPOSE 3001
CMD ["tsx", "index.ts"]
