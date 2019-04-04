#from mysocket import socketio

session_list = []
IS_CONNECTED = 1
IS_NOT_CONNECTED = 0

def store_new_connect(uuid, sid, namespace):
    con = {'uuid': uuid, 'sid': sid, 'status': IS_CONNECTED, 'namespace': namespace}
    result = is_existed_connect_uuid(uuid)
    if result == True:
        update_session_sid(uuid, sid)
    else:
        session_list.append(con)
    print(session_list)

def disconect_connect(sid):
    for session in session_list:
        if session['sid'] == sid:
            session['status'] = IS_NOT_CONNECTED

def is_existed_connect_uuid(uuid):
    for session in session_list:
        if session['uuid'] == uuid:
            return True
        else:
            return False

def update_session_sid(uuid, sid):
    for session in session_list:
        if session['uuid'] == uuid:
            session['sid'] = sid
            break

def emit_msg(event, args, namespace, sid):
    for session in session_list:
        if session['namespace'] == namespace and session['status'] == IS_CONNECTED:
            print("aaa")
                #socketio.emit(event, args, namespace=namespace, room=session['sid'])
