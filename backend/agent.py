from dotenv import load_dotenv
import os
from livekit import agents, rtc
from livekit.agents import AgentServer, AgentSession, Agent, room_io, RoomInputOptions
from openai.types.beta.realtime.session import TurnDetection
from livekit.plugins import (
    openai,
    noise_cancellation,
)
from livekit.plugins import tavus

from prompts import AGENT_INSTRUCTION, SESSION_INSTRUCTION
from tools import search_web, send_email, get_weather


load_dotenv()


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(instructions=AGENT_INSTRUCTION)


server = AgentServer()


@server.rtc_session()
async def my_agent(ctx: agents.JobContext):
    session = AgentSession(
        llm=openai.realtime.RealtimeModel.with_azure(
            azure_deployment="gpt-realtime-mini",
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version="2024-10-01-preview",
            voice="alloy",
            temperature=0.8,
            # turn_detection=TurnDetection(
            #     type="server_vad",
            #     threshold=0.5,
            #     prefix_padding_ms=300,
            #     silence_duration_ms=500,
            #     create_response=True,
            #     interrupt_response=True,
            # ),
        ),
        tools=[
            # search_web,
            send_email,
            get_weather,
        ],
    )

    avatar = tavus.AvatarSession(
        replica_id=os.environ.get("REPLICA_ID"),
        persona_id=os.environ.get("PERSONA_ID"),
        api_key=os.environ.get("TAVUS_API_KEY"),
    )

    # Start the avatar and wait for it to join
    await avatar.start(session, room=ctx.room)

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            # LiveKit Cloud enhanced noise cancellation
            # - If self-hosting, omit this parameter
            # - For telephony applications, use `BVCTelephony` for best results
            video_enabled=True,
            noise_cancellation=noise_cancellation.BVC(),
        ),
        # room_options=room_io.RoomOptions(
        #     audio_input=room_io.AudioInputOptions(
        #         noise_cancellation=lambda params: (
        #             noise_cancellation.BVCTelephony()
        #             if params.participant.kind
        #             == rtc.ParticipantKind.PARTICIPANT_KIND_SIP
        #             else noise_cancellation.BVC()
        #         ),
        #     ),
        # ),
    )

    await session.generate_reply(instructions=SESSION_INSTRUCTION)


if __name__ == "__main__":
    agents.cli.run_app(server)
