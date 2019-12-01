FROM  node:alpine

WORKDIR /usr/img-process

COPY package*.json ./ 
RUN npm install --silent --progress=false
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
