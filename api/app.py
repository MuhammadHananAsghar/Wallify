from flask import Flask, jsonify, request
from flask_cors import CORS
from zedge import Zedge 
import hashlib


app = Flask(__name__)
zedge = Zedge()
secretKey = "9af82031d374b97c9e73132a413cbdf5"
CORS(app)

@app.route("/")
def home():
    return "WallpaperAPI by Muhammad Hanan Asghar"

@app.route("/api", methods=["POST", "GET"])
def Api():
    json = {}
    try:
        query = request.args.get('query')
        page = request.args.get('page')
        size = request.args.get("size")
        secret = request.args.get("secret")
        print(query, page, size, secret)
        md5Result = hashlib.md5(secret.encode())
        if md5Result.hexdigest() == secretKey:
            json_data = zedge.getWallpapers(query=query, page=page, size=size)
            json_data.append({"status": 200})
            json = json_data
        else:
            json = {
                "status": 400,
                "message": "Secret key is not correct"
            }
    except Exception as e:
        print(e)
        json = {
            "status": 400,
            "message": "Error in server"
        }
        pass 
    return jsonify(json)


@app.route("/wallpaper", methods=["POST", "GET"])
def wallpaper():
    json = {}
    try:
        id = request.args.get("itemID")
        wallpaperLink = zedge.retrieveWallpaper(id)
        json = {"link": wallpaperLink, "status": 200}
    except Exception as e:
        print(e)
        json = {
            "status": 400,
            "message": "Error in server"
        }
    return jsonify(json)

if __name__ == "__main__":
    app.run(debug=True)