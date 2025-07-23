"use server";

import { VoiceGeneratorFormState } from "@/components/features/home/voice-generator";
import { Voice } from "@/lib/openai/voices";
import OpenAI from "openai";
import path from "path";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function generateAction(
  prevState: VoiceGeneratorFormState,
  formData: FormData
): Promise<VoiceGeneratorFormState> {
  const selectedVoice: Voice = JSON.parse(
    formData.get("selectedVoice") as string
  ) as Voice;
  const inputText: string = formData.get("inputText") as string;
  const instructions: string = formData.get("instructions") as string;

  const openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const mp3 = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: selectedVoice.id,
    input: inputText,
    instructions: instructions,
  });

  try {
    const speechFile = path.resolve(
      `./public/generated-audios/${selectedVoice.id}-speech.mp3`
    );
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    revalidatePath("/");
    return { selectedVoice, inputText, instructions };
  } catch (error) {
    return {
      selectedVoice,
      inputText,
      instructions,
      error: "Failed to generate speech",
    };
  }
}
