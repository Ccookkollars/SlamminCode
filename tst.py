# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import requests
import json


datas = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer THATS MYYYY KEY!"
        }

r = requests.get('https://api.spotify.com/v1/me/player/currently-playing', headers=datas)
print(r.text)
