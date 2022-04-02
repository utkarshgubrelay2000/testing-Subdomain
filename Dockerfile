FROM node:16
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose publc port and run npm command
EXPOSE 4000
CMD ["node", "server.js"]