FROM node:6.5.0
# Create app directory

RUN mkdir -p /home/app

ADD . /home/app

RUN chmod 777 /home/app

WORKDIR /home/app

RUN npm install
RUN chmod 777 -R /home/app
RUN npm run compile

EXPOSE 9000 9000

CMD [ "npm", "start" ]
