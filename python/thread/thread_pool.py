# -*- coding:utf-8 -*-

import threading
import Queue
import time
import random

from faker import Faker

class MyThread(threading.Thread):
  
    def __init__(self,queue):
        threading.Thread.__init__(self)
        self.queue = queue
        self.start()  # 因为作为一个工具，线程必须永远“在线”，所以不如让它在创建完成后直接运行，省得我们手动再去start它

        def run(self):
            while True:
                try:
                    func,args,kwargs = self.queue.get()
                    try:
                        func(*args,**kwargs)
                    except Exception,e:
                        raise ('bad execution: %s' % str(e))
                    self.queue.task_done()
                except Exception,e:
                    break

class MyThreadPool():
    def __init__(self,queue,size):
        self.queue = queue
        self.pool = []
        for i in range(size):
            self.pool.append(MyThread(queue))

    def joinAll(self):
        for thd in self.pool:
            if thd.isAlive():  
                thd.join()

if __name__ == '__main__':
    q = Queue.Queue(10)
    fake = Faker()
    for i in range(5):
        q.put(fake.word())
    pool = MyThreadPool(queue=q,size=2)
    pool.joinAll()