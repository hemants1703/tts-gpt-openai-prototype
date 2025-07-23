"use client";

import { GeneratedAudioFiles } from "@/app/page";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";

interface GeneratedAudioPlayerProps {
  generatedAudios: GeneratedAudioFiles[];
}

export default function GeneratedAudioPlayer(props: GeneratedAudioPlayerProps) {
  const [audioPlaying, setAudioPlaying] = useState<{
    playing: boolean;
    audioName: string;
  }>({
    playing: false,
    audioName: "",
  });

  const playAudio = (audioName: string) => {
    const audio = new Audio(`/generated-audios/${audioName}`);
    setAudioPlaying({ playing: true, audioName: audioName });
    audio.play();
    audio.onended = () => {
      setAudioPlaying({ playing: false, audioName: "" });
    };
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-2">
        <span className="inline-block bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Generated Audios
        </span>
      </h2>
      <div className="flex flex-col gap-1">
        {props.generatedAudios.length === 0 ? (
          <div className="text-muted-foreground text-sm text-center py-8 border border-dashed border-border rounded-lg bg-muted/30">
            No audio files generated yet.
          </div>
        ) : (
          props.generatedAudios.map((audio, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-muted/50 transition-colors duration-50 ease-in-out"
            >
              <div className="flex flex-col">
                <span className="font-medium text-base text-foreground truncate max-w-xs">
                  {audio.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {(audio.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <Button
                variant="default"
                size="icon"
                className="ml-4 rounded-full"
                onClick={() => playAudio(audio.name)}
                disabled={audioPlaying.playing}
                aria-label={`Play ${audio.name}`}
              >
                {audioPlaying.playing &&
                audio.name === audioPlaying.audioName ? (
                  <PauseIcon className="w-4 h-4" />
                ) : (
                  <PlayIcon />
                )}
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
