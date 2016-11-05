from modules.utils import md5
from config import config
import json

_games = {}


def load_game():
    global _games
    try:
        with open(config['saveFile']) as f:
            raw = f.read()
            try:
                _games = json.loads(raw)
            except ValueError as e:
                print(e)
    except FileNotFoundError:
        print("Starting without a save")


def save_game():
    with open(config['saveFile'], 'w+') as f:
        f.write(json.dumps(_games))


def get_games():
    return _games, 200


def put_game(name, password):
    game = {
        "password": md5(password),
        "slots": 1,
        "attributes": {},
        "players": {}
    }
    if name not in _games.keys():
        _games[name] = game
        return game, 200
    return {"error": "Game already existing"}, 406


def delete_game(name, password):
    game, code = can_edit_game(name, password)
    if code == 200:
        del _games[name]
        return {"message": "Game removed"}, 200
    return game, code


def put_game_player(name, password, player_name):
    game, code = can_edit_game(name, password)
    if code == 200:
        player = {
            "attributes": game['attributes'],
            "bio": "Fill your biography..."
        }
        if game['slots'] > len(game['players']) + 1:
            return {"error": "There isn't enough slots"}, 406
        game['players'][player_name] = player
        _games[name] = game
    return game, code


def can_edit_game(name, password):
    game, return_code = get_game(name)
    if return_code == 200:
        if md5(password) != game['password']:
            return {"error": "Invalid password"}, 401
    return game, return_code


def put_game_slot(name, password):
    game, code = can_edit_game(name, password)
    if code == 200:
        game['slots'] += 1
        _games[name] = game
    return game, code


def put_game_attribute(name, password, attribute, min, max):
    game, code = can_edit_game(name, password)
    if code == 200:
        if attribute in game['attributes'].keys():
            return {"error": "Attribute already existing"}, 406
        game['attributes'][attribute] = {"min": min, "max": max}
        _games[name] = game
    return game, code


def delete_game_attribute(name, password, attribute):
    game, code = can_edit_game(name, password)
    if code == 200:
        if attribute not in game['attributes'].keys():
            return {"error": "There isn't such attribute"}, 404
        del game['attributes'][attribute]
        _games[name] = game
    return game, code


def post_game_player_attribute(name, password, player, attribute, value):
    game, code = can_edit_game(name, password)
    if code == 200:
        if player not in game['players'].keys():
            return {"error": "There isn't such player"}, 404
        if attribute not in game['players'][player]['attributes'].keys():
            return {"error": "This player hasn't this attribute"}, 404
        game['players'][player]['attributes'][attribute]['value'] = value
        _games[name] = game;
    return game, code

def get_game(name):
    if name in _games.keys():
        return _games[name], 200
    return {"error": "There isn't such game"}, 404
