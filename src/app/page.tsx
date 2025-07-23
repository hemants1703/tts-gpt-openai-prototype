import VoiceGenerator from "@/components/features/home/voice-generator";
import GeneratedAudioPlayer from "@/components/features/home/generated-audio-player";
import path from "path";
import fs from "fs";

export interface GeneratedAudioFiles {
  name: string;
  path: string;
  size: number;
}

export default async function Home() {
  const getAudioFiles = async (): Promise<GeneratedAudioFiles[]> => {
    const publicDirPath = path.join(
      process.cwd(),
      "public",
      "generated-audios"
    );
    const files = await fs.promises.readdir(publicDirPath);
    return await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(publicDirPath, file);
        const fileStats = await fs.promises.stat(filePath);
        return {
          name: file,
          path: filePath,
          size: fileStats.size,
        };
      })
    );
  };

  return (
    <main className="w-full max-w-screen-xl mx-auto px-4 py-10 flex flex-col gap-8">
      <section className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
          Text to Speech
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Convert text to speech with OpenAI&apos;s API. Experience
          ultra-premium, instant voice generation with beautiful UI.
        </p>
      </section>
      <section className="bg-gradient-to-b from-muted/50 to-muted/10 border border-border rounded-xl p-4 flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 min-w-0 lg:pr-6 border-none">
          <VoiceGenerator />
        </div>
        <div className="flex-1 min-w-0 lg:pl-6 border-none">
          <GeneratedAudioPlayer generatedAudios={await getAudioFiles()} />
        </div>
      </section>
    </main>
  );
}
