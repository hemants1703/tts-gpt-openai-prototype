"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Voice, voices } from "@/lib/openai/voices";
import { CheckIcon, ChevronsUpDownIcon, Loader2Icon } from "lucide-react";
import { useActionState, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { generateAction } from "@/lib/actions/home/generate-action";
import { Label } from "@/components/ui/label";

export interface VoiceGeneratorFormState {
  selectedVoice: Voice;
  inputText: string;
  instructions: string;
  error?: string;
}

export default function VoiceGenerator() {
  const [selectedVoice, setSelectedVoice] = useState<Voice>(voices[0]);
  const [inputText, setInputText] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [openVoiceMenu, setOpenVoiceMenu] = useState<boolean>(false);
  const [formState, formAction, isGenerationPending] = useActionState<
    VoiceGeneratorFormState,
    FormData
  >(generateAction, {
    selectedVoice,
    inputText: inputText,
    instructions: instructions,
    error: "",
  });

  return (
    <div>
      <form action={formAction} method="POST" className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-2">
          <span className="inline-block bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Generate Audio
          </span>
        </h2>
        <input
          type="hidden"
          name="selectedVoice"
          value={JSON.stringify(selectedVoice)}
        />
        <Popover open={openVoiceMenu} onOpenChange={setOpenVoiceMenu}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openVoiceMenu}
              className="w-[200px] justify-between"
            >
              {selectedVoice.name ? selectedVoice.name : "Select voice..."}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search voice..." />
              <CommandList>
                <CommandEmpty>No voice found.</CommandEmpty>
                <CommandGroup>
                  {voices.map((voice) => (
                    <CommandItem
                      key={voice.id}
                      value={voice.id}
                      onSelect={(currentValue) => {
                        setSelectedVoice(
                          voices.find(
                            (voice: Voice) => voice.id === currentValue
                          ) || voices[0]
                        );
                        setOpenVoiceMenu(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          voice.id === selectedVoice.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {voice.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex gap-2">
          <Textarea
            name={"inputText"}
            placeholder="Enter text to convert to speech"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            className="h-52"
          />
          <Textarea
            name={"instructions"}
            placeholder="Enter instructions"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            className="h-52"
          />
        </div>
        {formState.error && <p className="text-red-500">{formState.error}</p>}
        <Button disabled={isGenerationPending || !inputText} type="submit">
          {isGenerationPending ? (
            <span className="flex items-center gap-2">
              <Loader2Icon className="animate-spin" /> Generating...
            </span>
          ) : (
            "Generate"
          )}
        </Button>
      </form>
    </div>
  );
}
