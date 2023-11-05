# How to setup this webapp
steps to setup webapp:
- Once logged in and at ```cd /home/project/oms/src``` you must start the backend, ```pm2 start app.py``` will start the python backend in the background so that you can start other processses
- When you start the backend you can then launch the webapp ```sudo npm start``` we use sudo as linux is terrible
- Now you can navigate to http://3.130.252.18:3000/ and the webapp will launch
