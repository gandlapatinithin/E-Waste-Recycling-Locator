from flask import Flask, jsonify
from flask_cors import CORS
import firestore

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/centers', methods=['GET'])
def get_centers():
    centers = firestore.get_recycling_centers()
    return jsonify(centers)

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = firestore.get_leaderboard()
    return jsonify(leaderboard)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
