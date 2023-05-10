from flask import Flask, request, jsonify
from generate_statblock import generate_statblock

app = Flask(__name__)

@app.route('Generator/generate_statblock', methods=['GET', 'POST', 'PUT', 'DELETE'])
def generate_statblock_route():
    # Get the monster name from the request data
    data = request.get_json()
    monster_name = data['monster_name']

    # Generate the stat block using the generate_statblock function
    stat_block = generate_statblock(monster_name)

    # Return the stat block as a JSON response
    response = {'stat_block': stat_block}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
