"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SORTBY } from "@/lib/types/sortby";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const sortArr = Object.values(SORTBY);

export const ComboboxDemo = ({
  value,
  setValue,
}: {
  value: SORTBY;
  setValue: Dispatch<SetStateAction<SORTBY>>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open}>
            {`Sortuj od ${sortArr.find((el) => value === el)}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup>
              {sortArr.map((element) => (
                <CommandItem
                  key={element}
                  value={element}
                  onSelect={(currentValue: any) => {
                    if (currentValue !== value) {
                      setValue(currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === element ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {`od ${element}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
