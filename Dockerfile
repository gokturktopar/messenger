# Setup env
FROM node:14
WORKDIR /usr/app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g nodemon

# Move source codes
COPY . .

# Run
EXPOSE 3000
CMD ["npm", "start"]