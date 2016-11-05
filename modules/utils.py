import hashlib

def md5(string):
    hashed = hashlib.md5()
    hashed.update(string.encode("UTF-8"))
    return hashed.hexdigest()
