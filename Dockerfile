FROM node:10
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

RUN npm install express

COPY . /app

WORKDIR /app
RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "node", "server.js" ]