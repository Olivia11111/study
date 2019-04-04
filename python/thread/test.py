from gevent import monkey
from gevent.pywsgi import WSGIServer
monkey.patch_all()
from flask import Flask
import time
from werkzeug.debug import DebuggedApplication

app = Flask(__name__)

@app.route('/test')
def sayHello():
    print("enter function sayHello")
    sleepFuc()
    print("finished sleep")
    return 'hello'

@app.route('/hi')
def sayHi():
    return 'hi'

def sleepFuc ():
    print("enter sleep fuc")
    #time.sleep(10)
    count = 0
    while (count < 100000000):
        count = count + 1
    print("exit sleep func")

if __name__ =='__main__':
    app.run(debug=True, threaded = True)