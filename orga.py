#!/bin/env python

from flask import Flask, jsonify
from config import config
from modules.games import *

app = Flask(__name__)

@app.route("/games/save", methods=["POST"])
def route_post_save():
    save_game()
    return "OK"

@app.route("/games", methods=["GET"])
def route_get_games():
    message, return_code = get_games()
    return jsonify(message), return_code

@app.route("/game/<name>", methods=["GET"])
def route_get_game(name):
    message, return_code = get_game(name)
    return jsonify(message), return_code

@app.route("/game/<name>/<password>", methods=["PUT"])
def route_put_game(name, password):
    message, return_code = put_game(name, password)
    return jsonify(message), return_code

@app.route("/game/<name>/<password>", methods=["DELETE"])
def route_delete_game(name, password):
    message, return_code = delete_game(name, password)
    return jsonify(message), return_code

@app.route("/game/<name>/<password>/slot", methods=["PUT"])
def route_put_game_slot(name, password):
    message, return_code = put_game_slot(name, password)
    return jsonify(message), return_code

@app.route("/game/<name>/<password>/attribute/<attribute>", methods=["DELETE"])
def route_delete_game_attribute(name, password, attribute):
    message, return_code = delete_game_attribute(name, password, attribute)
    return jsonify(message), return_code

@app.route("/game/<name>/<password>/attribute/<attribute>/<min>/<max>", methods=["PUT"])
def route_put_game_attribute(name, password, attribute, min, max):
    message, return_code = put_game_attribute(name, password, attribute, min, max)
    return jsonify(message), return_code

@app.route("/game/<name>/<password>/player/<player>", methods=["PUT"])
def route_put_game_player(name, password, player):
    message, return_code = put_game_player(name, password, player)
    return jsonify(message), return_code

@app.route("/game/<name>/<password>/player/<player>/attribute/<attribute>/<value>", methods=["POST"])
def route_post_game_player_attribute(name, password, player, attribute, value):
    message, return_code = post_game_player_attribute(name, password, player, attribute, value)
    return jsonify(message), return_code

@app.route("/", methods=["GET"])
def route():
    return {"message": "Welcome to ORGA"}

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, PATCH, DELETE")
    response.headers.add('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization")
    response.headers.add('Content-Type','application/json')
    response.data = response.data.decode("unicode_escape").encode("UTF-8")
    return response

def main():
    load_game()
    app.run(host=config['host'], port=config['port'], threaded=True)
    return 

if __name__ == "__main__":
    main()
