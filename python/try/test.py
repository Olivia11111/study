import sys

def divide(x,y):  
    try:  
        result=x/y
        print(result)
    except:
        print("Unexpected error:", sys.exc_info()[0])
        #raise

def divide2(x,y):
    result=x/y
    print(result)

divide2('2','1')
print("end")