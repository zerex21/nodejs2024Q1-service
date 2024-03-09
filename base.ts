/* eslint-disable prettier/prettier */
export let base = {
   "Users":[
      {"id": "a4e73037-ad8f-4706-a559-faed24017de1",
      "login": "42",
      "password": "42",
      "version": 42,
      "createdAt": 42,
      "updatedAt": 0},

      {"id": "string",
      "login": "string",
      "password": "string",
      "version": "number",
      "createdAt": "number",
      "updatedAt": 1}
  ],
   "Artists":[
      {"id": "string",
      "name": "string",
      "grammy": "boolean"}
  ],
   "Tracks":[
      {"id": "string",
      "name": "string",
      "artistId": "string | null",
      "albumId": "string | null",
      "duration": "number"}
  ],
   "Albums":[{
      "id": "string",
      "name": "string",
      "year": "number",
      "artistId": "string | null"
   }],
   "Favorites":{
      "artists":[],
      "albums": [],
      "tracks": []}
  }

