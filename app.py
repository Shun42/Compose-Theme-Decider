from random import choices, randint, choice

from flask import Flask, jsonify, render_template


REFERENCE_ARTISTS = {
    "YOASOBI": 5,
    "米津玄師": 3,
    "Official髭男dism": 7,
    "Queen": 3,
    "ずっと真夜中でいいのに": 10,
    "アリス": 3,
    "NUMB": 5,
    "10-FFEET": 3,
    "Knocked Loose": 5,
    "KAMIJO": 7,
    "NEK!": 3,
    "Sum 41": 5,
    "D": 5,
    "カラスは真っ白": 5,
    "三月のパンタシア": 3,
    "マザリ": 3,
    "EGOIST": 5,
    "UNISON SQUARE GARDEN": 3,
    "CLAN QUEEN": 5,
    "NOMELON NOLEMON": 5,
    "thrown": 5,
    "Keith Jarret": 3,
    "マルシィ": 3,
    "Art Blakey": 3,
    "Oscar Peterson": 3,
    "Ave Musica": 7,
    "PALM": 3,
    "AKASAKI": 3,
    "indigo la End": 7,
    "back number": 7,
    "ANTHEM": 5,
    "アイリフドーパ": 5,
    "HER NAME IN BLOOD": 3,
    "GIVEN BY THE FLAMES": 3,
    "Sin Scripture": 5,
    "結束バンド": 3,
    "Get The Shot": 3,
    "BAND-MAID": 3,
    "Mettalica": 3,
    "FIVE NEW OLD": 3,
    "Veiled in Scarlet": 5,
    "Every Little Thing": 3,
    "シャ乱Q": 3,
    "Green Day": 5,
    "Body Snatcher": 7,
    "B'z": 7,
    "Nuclear Power Trio": 5,
    "Nirvana": 3,
    "純烈": 5,
    "ovEnola": 3,
    "Paleface Swiss": 5,
    "村下孝蔵": 5,
    "ピンク・レディー": 5,
    "山口百恵": 3,
    "ペンタゴン": 5,
    "the GazzettE": 3,
    "Lee Morgan": 5,
    "アルルカン": 5,
    "DADAROMA": 5,
    "Prompts": 3,
    "シド": 5,
    "WANDS": 3,
    "SILENT SIREN": 3,
    "VICTIMOFDECEPTION": 5,
    "Madmans Esprit": 7,
    "竹内まりや": 7,
    "石川さゆり": 3,
    "野口五郎": 7,
    "My Chemical Romance": 3,
    "広瀬香美": 3,
    "チェッカーズ": 5,
    "NOCTURNAL BLOODLUST": 3,
    "Wage War": 3,
    "Hibria": 5,
    "Slipknot": 5,
    "Children Of Bodom": 3,
    "Lamb of God": 3,
    "Skid Row": 5,
    "Arch Enemy": 3,
    "Shrine of Malice": 5,
    "Rhapsody": 3,
    "Stratovarius": 3,
    "Acid Black Cherry": 7,
    "MinstreliX": 5,
    "PassCode": 5,
    "Chelsea Grin": 3,
    "Thy Art is Murder": 3,
    "Suicide Silence": 3,
    "椎名林檎": 5,
}

SECTIONS = ["イントロ", "Aメロ", "サビ"]


app = Flask(__name__)


def draw_theme():
    return {
        "artist": choices(
            list(REFERENCE_ARTISTS.keys()),
            weights=list(REFERENCE_ARTISTS.values()),
            k=1,
        )[0],
        "bpm": randint(80, 200),
        "section": choice(SECTIONS),
    }


@app.route("/")
def index():
    return render_template("index.html", theme=draw_theme())


@app.route("/draw")
def draw():
    return jsonify(draw_theme())


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
