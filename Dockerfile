FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Copy initialization script
COPY init.sh .

# Grant execute permissions to the script
RUN chmod +x init.sh

CMD [ "npm", "start" ]
