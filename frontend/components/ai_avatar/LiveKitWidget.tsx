import { useState, useCallback, useEffect } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import AvatarVoiceAgent from "./AvatarVoiceAgent";
import "./LiveKitWidget.css";

const LiveKitWidget = ({ setShowSupport }: { setShowSupport: any }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const getToken = useCallback(async () => {
    try {
      console.log("Fetching token...");
      const response = await fetch(
        `http://localhost:5001/getToken?name=${encodeURIComponent("admin")}`
      );
      console.log(response);
      const tokenText = await response.text();
      const trimmedToken = tokenText.trim(); // ADD THIS LINE
      console.log("Token received:", trimmedToken);
      setToken(trimmedToken); // Use trimmed token
      setIsConnecting(false);
    } catch (error) {
      console.error("Error fetching token:", error);
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]); // Add getToken to dependencies

  return (
    <div className="modal-content">
      <div className="support-room">
        {isConnecting ? (
          <div className="connecting-status">
            <h2>Connecting to support...</h2>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowSupport(false)}
            >
              Cancel
            </button>
          </div>
        ) : token ? (
          <LiveKitRoom
            serverUrl="wss://customer-support-4nr1hdpr.livekit.cloud"
            token={token}
            connect={true}
            video={false}
            audio={true}
            onDisconnected={() => {
              setShowSupport(false);
              // setToken(null);
              setIsConnecting(true);
            }}
          >
            <RoomAudioRenderer />
            <AvatarVoiceAgent />
          </LiveKitRoom>
        ) : (
          <div className="error-status">
            <h2>Failed to connect</h2>
            <button onClick={() => setShowSupport(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveKitWidget;
