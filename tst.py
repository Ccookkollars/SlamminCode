# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import requests
import json

r = requests.get('https://api.spotify.com/v1/me/player/currently-playing')
print(r.json())