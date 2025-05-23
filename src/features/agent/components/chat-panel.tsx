"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useState, useEffect } from "react";
import { TranscriptionTile } from "./transcription-tile";
import {
  useVoiceAssistant,
  useTracks,
  VideoTrack,
} from "@livekit/components-react";
import { useConfig } from "@/features/agent/hooks/useConfig";
import { useRoomContext, useLocalParticipant } from "@livekit/components-react";
import { useConnection } from "@/features/agent/hooks/useConnection";
import { toast } from "sonner";
import { Track, LocalParticipant } from "livekit-client";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const voiceAssistant = useVoiceAssistant();
  const { config } = useConfig();
  const room = useRoomContext();
  const { connect, disconnect, shouldConnect, mode } = useConnection();
  const { localParticipant } = useLocalParticipant();
  const tracks = useTracks();

  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  );
  const localCameraTrack = localTracks.find(
    ({ source }) => source === Track.Source.Camera
  );

  useEffect(() => {
    if (localParticipant) {
      localParticipant.setMicrophoneEnabled(false);
      localParticipant.setCameraEnabled(false);
      setIsMuted(true);
      setIsVideoEnabled(false);
    }
  }, [localParticipant]);

  useEffect(() => {
    if (localParticipant) {
      const handleTrackEnabled = () => {
        setIsMuted(!localParticipant.isMicrophoneEnabled);
        setIsVideoEnabled(localParticipant.isCameraEnabled);
      };

      localParticipant.on("trackPublished", handleTrackEnabled);
      localParticipant.on("trackUnpublished", handleTrackEnabled);

      return () => {
        localParticipant.off("trackPublished", handleTrackEnabled);
        localParticipant.off("trackUnpublished", handleTrackEnabled);
      };
    }
  }, [localParticipant]);

  if (!isOpen) return null;

  // If not in a LiveKit room context, show a message to connect first
  if (!room) {
    return (
      <div className="fixed inset-0 bg-black/20 z-50 flex items-end justify-end p-4 md:p-6">
        <Card className="w-full max-w-md h-[500px] flex flex-col animate-in slide-in-from-bottom duration-300">
          <CardHeader className="border-b px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">Chat with us</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
            <p className="text-center text-gray-500">
              Please connect to a LiveKit room first to use the chat.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleConnect = async () => {
    try {
      const connectionMode = process.env.NEXT_PUBLIC_LIVEKIT_URL ? "env" : mode;
      await connect(connectionMode);
    } catch (error) {
      toast.error("Failed to connect to LiveKit room");
      console.error(error);
    }
  };

  const handleMicToggle = async () => {
    if (localParticipant) {
      try {
        const newState = !localParticipant.isMicrophoneEnabled;
        await localParticipant.setMicrophoneEnabled(newState);
        setIsMuted(!newState);
      } catch (error) {
        console.error("Failed to toggle microphone:", error);
        toast.error("Failed to toggle microphone");
      }
    }
  };

  const handleVideoToggle = async () => {
    if (localParticipant) {
      try {
        const newState = !localParticipant.isCameraEnabled;
        await localParticipant.setCameraEnabled(newState);
        setIsVideoEnabled(newState);
      } catch (error) {
        console.error("Failed to toggle camera:", error);
        toast.error("Failed to toggle camera");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-end justify-end p-4 md:p-6">
      <Card className="w-full max-w-md h-[500px] flex flex-col animate-in slide-in-from-bottom duration-300">
        <CardHeader className="border-b px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Chat with us</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                if (voiceAssistant.agent) {
                  disconnect();
                } else {
                  handleConnect();
                }
              }}
              disabled={shouldConnect}
            >
              {voiceAssistant.agent
                ? "Disconnect"
                : shouldConnect
                ? "Connecting..."
                : "Connect"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMicToggle}
              className={
                isMuted
                  ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200 hover:text-red-800"
                  : ""
              }
              aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
            >
              {isMuted ? (
                <div className="flex items-center">
                  <MicOff className="h-4 w-4 mr-1 text-red-500" />
                  <span>Unmute</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Mic className="h-4 w-4 mr-1" />
                  <span>Mute</span>
                </div>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVideoToggle}
              className={
                !isVideoEnabled
                  ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200 hover:text-red-800"
                  : ""
              }
              aria-label={isVideoEnabled ? "Disable video" : "Enable video"}
            >
              {!isVideoEnabled ? (
                <div className="flex items-center">
                  <VideoOff className="h-4 w-4 mr-1 text-red-500" />
                  <span>Start Video</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  <span>Stop Video</span>
                </div>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          {isVideoEnabled && localCameraTrack && (
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-gray-200">
              <VideoTrack
                className="absolute inset-0 w-full h-full object-cover"
                trackRef={localCameraTrack}
              />
            </div>
          )}
          {voiceAssistant.agent && (
            <TranscriptionTile
              agentAudioTrack={voiceAssistant.audioTrack}
              accentColor={config.settings.theme_color}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
