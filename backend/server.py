import os
from livekit import api
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from livekit.api import LiveKitAPI, ListRoomsRequest
import uuid
import uvicorn

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def generate_room_name():
    name = "room-" + str(uuid.uuid4())[:8]
    rooms = await get_rooms()
    while name in rooms:
        name = "room-" + str(uuid.uuid4())[:8]
    return name


async def get_rooms():
    lk_api = LiveKitAPI()
    rooms = await lk_api.room.list_rooms(ListRoomsRequest())
    await lk_api.aclose()
    return [room.name for room in rooms.rooms]


@app.get("/getToken")
async def get_token(
    name: str = Query(default="my name"), room: str = Query(default=None)
):
    if not room:
        room = await generate_room_name()

    token = (
        api.AccessToken(os.getenv("LIVEKIT_API_KEY"), os.getenv("LIVEKIT_API_SECRET"))
        .with_identity(name)
        .with_name(name)
        .with_grants(api.VideoGrants(room_join=True, room=room))
    )

    return {"token": token.to_jwt(), "room": room}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001)
