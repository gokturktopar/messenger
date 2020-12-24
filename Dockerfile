# Setup env
FROM node:14.12.0
WORKDIR /code

# Install dependencies
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install
RUN npm install -g nodemon

# Move source codes
COPY . /code

# Run
EXPOSE 3000
CMD ["npm", "start"]