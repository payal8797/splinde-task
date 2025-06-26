FROM node:20

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 4173

# 👇 This is the fix:
CMD ["npx", "vite", "preview", "--host", "0.0.0.0"]
