import { auth } from "@/lib";
import { useChat } from "@/providers/ChatProvider";
import { Phone, Video, PhoneCall, PhoneOff } from "lucide-react";
import { useRef, useState } from "react";
import { realtimeDatabase } from "@/lib";
import { onValue, push, ref, remove, set, update } from "firebase/database";

export const ChatHeader = () => {
  const currentUser = auth.currentUser?.displayName;

  const [call, setCall] = useState<boolean>(false);

  const { activeChat } = useChat();

  const otherParticipant = activeChat?.participants.find(
    (participant) => participant !== currentUser
  );

  const localRef = useRef<HTMLVideoElement | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);
  let localStream: MediaStream;
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const startCall = async () => {
    setCall(true);

    // Initialize peer connection
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    try {
      // Get user media
      localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      // Set local video
      if (localRef.current) {
        localRef.current.srcObject = localStream;
        await localRef.current
          .play()
          .catch((err) => console.error("Local video play error:", err));
      }

      // Add local tracks to peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        console.log("Remote track received:", event);
        if (remoteRef.current && event.streams[0]) {
          remoteRef.current.srcObject = event.streams[0];
          // Ensure remote video plays
          remoteRef.current
            .play()
            .catch((err) => console.error("Remote video play error:", err));
        }
      };

      // Handle ICE candidates - store multiple candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Caller ICE candidate:", event.candidate);
          push(
            ref(realtimeDatabase, `calls/${activeChat.id}/callerCandidates`),
            event.candidate.toJSON()
          );
        }
      };

      // Monitor connection states
      peerConnection.current.onconnectionstatechange = () => {
        console.log(
          "Connection state:",
          peerConnection.current.connectionState
        );
      };

      peerConnection.current.oniceconnectionstatechange = () => {
        console.log(
          "ICE connection state:",
          peerConnection.current.iceConnectionState
        );
      };

      // Create and send offer
      const offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peerConnection.current.setLocalDescription(offer);

      // Store offer in database
      await set(ref(realtimeDatabase, `calls/${activeChat.id}`), {
        offer: offer,
        status: "calling",
      });

      // Listen for answer
      const answerRef = ref(realtimeDatabase, `calls/${activeChat.id}/answer`);
      const answerUnsubscribe = onValue(answerRef, async (snapshot) => {
        const answer = snapshot.val();
        if (answer && !peerConnection.current.remoteDescription) {
          console.log("Received answer:", answer);
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        }
      });

      // Listen for callee ICE candidates
      const calleeCandidatesRef = ref(
        realtimeDatabase,
        `calls/${activeChat.id}/calleeCandidates`
      );
      const calleeUnsubscribe = onValue(
        calleeCandidatesRef,
        async (snapshot) => {
          const candidates = snapshot.val();
          if (candidates) {
            Object.values(candidates).forEach(async (candidate) => {
              try {
                if (peerConnection.current.remoteDescription) {
                  await peerConnection.current.addIceCandidate(
                    new RTCIceCandidate(candidate)
                  );
                  console.log("Added callee ICE candidate");
                }
              } catch (err) {
                console.error("Error adding callee ICE candidate:", err);
              }
            });
          }
        }
      );

      // Store unsubscribe functions for cleanup
      window.callUnsubscribeFunctions = [answerUnsubscribe, calleeUnsubscribe];
    } catch (error) {
      console.error("Error starting call:", error);
      setCall(false);
    }
  };

  const answerCall = async () => {
    setCall(true);

    // Initialize peer connection
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    try {
      // Get user media
      localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      // Set local video
      if (localRef.current) {
        localRef.current.srcObject = localStream;
        await localRef.current
          .play()
          .catch((err) => console.error("Local video play error:", err));
      }

      // Add local tracks to peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        console.log("Remote track received:", event);
        if (remoteRef.current && event.streams[0]) {
          remoteRef.current.srcObject = event.streams[0];
          // Ensure remote video plays
          remoteRef.current
            .play()
            .catch((err) => console.error("Remote video play error:", err));
        }
      };

      // Handle ICE candidates - store multiple candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          // console.log("Callee ICE candidate:", event.candidate);
          push(
            ref(realtimeDatabase, `calls/${activeChat.id}/calleeCandidates`),
            event.candidate.toJSON()
          );
        }
      };

      // Monitor connection states
      peerConnection.current.onconnectionstatechange = () => {
        console.log(
          "Connection state:",
          peerConnection.current.connectionState
        );
      };

      peerConnection.current.oniceconnectionstatechange = () => {
        console.log(
          "ICE connection state:",
          peerConnection.current.iceConnectionState
        );
      };

      // Listen for offer
      const offerRef = ref(realtimeDatabase, `calls/${activeChat.id}/offer`);
      const offerUnsubscribe = onValue(offerRef, async (snapshot) => {
        const offer = snapshot.val();
        if (offer && !peerConnection.current.remoteDescription) {
          console.log("Received offer:", offer);

          // Set remote description
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(offer)
          );

          // Create and send answer
          const answer = await peerConnection.current.createAnswer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });
          await peerConnection.current.setLocalDescription(answer);

          // Store answer in database
          await update(ref(realtimeDatabase, `calls/${activeChat.id}`), {
            answer: answer,
            status: "answered",
          });
        }
      });

      // Listen for caller ICE candidates
      const callerCandidatesRef = ref(
        realtimeDatabase,
        `calls/${activeChat.id}/callerCandidates`
      );
      const callerUnsubscribe = onValue(
        callerCandidatesRef,
        async (snapshot) => {
          const candidates = snapshot.val();
          if (candidates) {
            Object.values(candidates).forEach(async (candidate) => {
              try {
                if (peerConnection.current.remoteDescription) {
                  await peerConnection.current.addIceCandidate(
                    new RTCIceCandidate(candidate)
                  );
                  console.log("Added caller ICE candidate");
                }
              } catch (err) {
                console.error("Error adding caller ICE candidate:", err);
              }
            });
          }
        }
      );

      // Store unsubscribe functions for cleanup
      window.callUnsubscribeFunctions = [offerUnsubscribe, callerUnsubscribe];
    } catch (error) {
      console.error("Error answering call:", error);
      setCall(false);
    }
  };

  const endCall = async () => {
    try {
      // Close peer connection
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }

      // Stop local stream
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        localStream = null;
      }

      // Clear video elements
      if (localRef.current) {
        localRef.current.srcObject = null;
      }
      if (remoteRef.current) {
        remoteRef.current.srcObject = null;
      }

      // Clean up Firebase listeners
      if (window.callUnsubscribeFunctions) {
        window.callUnsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
        window.callUnsubscribeFunctions = null;
      }

      // Remove call data from database
      await remove(ref(realtimeDatabase, `calls/${activeChat.id}`));

      setCall(false);
    } catch (error) {
      console.error("Error ending call:", error);
    }
  };
  
  return (
    <div className="flex border-b border-b-neutral-700 transition-all items-center justify-between p-3">
      <div className="flex items-center">
        <div className="w-10 mr-4 flex items-center justify-center text-normal capitalize font-semibold h-10 bg-neutral-700 rounded-full">
          {otherParticipant[0]}
        </div>
        <p>{otherParticipant}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={startCall}
          className="p-2 rounded-full hover:bg-neutral-700 transition-colors"
          aria-label="Video Call"
        >
          <Video size={18} />
        </button>
        <button
          onClick={answerCall}
          className="p-2 rounded-full hover:bg-neutral-700 transition-colors"
          aria-label="Voice Call"
        >
          <PhoneCall size={18} />
        </button>
      </div>
      {call && (
        <>
          <div className="gap-4 left-[170px] bottom-10 flex flex-col items-end justify-center absolute">
            <button
              onClick={endCall}
              className="p-2 rounded-full hover:bg-neutral-700 transition-colors"
              aria-label="Video Call"
            >
              <PhoneOff size={18} />
            </button>
            {/* <button
                onClick={answerCall}
                className="p-2 rounded-full hover:bg-neutral-700 transition-colors"
                aria-label="Video Call"
              >
                <PhoneCall size={18} />
              </button> */}
            <div className="flex gap-4">
              <video
                ref={localRef}
                autoPlay
                muted
                playsInline
                className="rounded-xl border border-neutral-600 w-[500px]"
              />
              <video
                ref={remoteRef}
                autoPlay
                playsInline
                className="rounded-xl border border-neutral-600 w-[500px]"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
