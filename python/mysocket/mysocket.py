from flask import Flask, render_template, request
from flask_socketio import SocketIO
import threadPool as pool
from threading import Lock
import session_mng
thread = None
thread_lock = Lock()

async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)

def background_thread(sid, namespace):
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        """socketio.emit('my_response',
                      {'data': 'Server generated event', 'count': count},
                      namespace='/test')"""
       # session_mng.emit_msg('my_response',{'data': 'Server generated event', 'count': count, 'sid':sid}, namespace,sid)

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@socketio.on('new connect', namespace='/test')
def new_connect(info):
    print("new_connect: info.uuid=", info['uuid'])
    print("request.sid=", request.sid)
    session_mng.store_new_connect(info['uuid'], request.sid, '/test')

@socketio.on('my event', namespace='/test')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

@socketio.on('connect', namespace='/test')
def test_connect():    
    print('client connected')
    global thread
    #with thread_lock:
        #if thread is None:
            #thread = socketio.start_background_task(background_thread, request.sid,'/test')

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    session_mng.disconect_connect(request.sid)
    print('Client disconnected', request.sid)

if __name__ == '__main__':
    socketio.run(app, debug=True)