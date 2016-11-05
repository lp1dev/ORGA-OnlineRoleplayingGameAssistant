#!/bin/python

from flask import Flask
from config import config

app = Flask(__name__)

def main():
    app.run(host=config['host'], port=config['port'], threaded=True)
    return 

if __name__ == "__main__":
    main()
