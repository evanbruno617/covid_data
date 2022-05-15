import pandas as pd
df = pd.read_csv("static/csv/Orange.csv")
df.to_json("static/json/orange.json")

df = pd.read_csv("static/csv/LA_County.csv")
df.to_json("static/json/LA_County.json")

df = pd.read_csv("static/csv/LA_metro.csv")
df.to_json("static/json/LA_metro.json")

df = pd.read_csv("static/csv/Riverside.csv")
df.to_json("static/json/Riverside.json")

df = pd.read_csv("static/csv/San_Bernadino.csv")
df.to_json("static/json/San_Bernadino.json")

df = pd.read_csv("static/csv/ventura.csv")
df.to_json("static/json/ventura.json")

