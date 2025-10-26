"use client";

import { MenuIcon, ShareIcon } from "lucide-react";
// ...existing code...
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import Image from "next/image";
import { ComponentPropsWithRef, type FC } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import icon from "@/public/favicon/icon.svg";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ModelPicker } from "./ModelPicker";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";

type ButtonWithTooltipProps = ComponentPropsWithRef<typeof Button> & {
  tooltip: string;
  side?: TooltipContentProps["side"];
};

const ButtonWithTooltip: FC<ButtonWithTooltipProps> = ({
  children,
  tooltip,
  side = "top",
  ...rest
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...rest}>
          {children}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

const TopLeft: FC = () => {
  return (
    <div className="flex h-full w-full items-center gap-2 px-3 text-sm font-semibold">
      <button
        type="button"
        className="flex items-center justify-center rounded-md border border-muted bg-background px-2 py-1 text-muted-foreground"
        aria-label="Menu"
        style={{ width: 32, height: 32 }}
      >
        <MenuIcon className="size-5" />
      </button>
      <span>GPT</span>
    </div>
  );
};

const MainLeft: FC = () => {
  return <ThreadList />;
};

const LeftBarSheet: FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <MenuIcon className="size-4" />
          <span className="sr-only"> navigToggleation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="mt-6 flex flex-col gap-1">
          <TopLeft />
          <MainLeft />
        </div>
      </SheetContent>
    </Sheet>
  );
};

type HeaderProps = {
  onMenuClick: () => void;
};

const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center gap-2 px-3 border-b bg-white w-full h-16">
      <button
        type="button"
        className="flex items-center justify-center rounded-md border border-muted bg-background px-2 py-1 text-muted-foreground"
        aria-label="Menu"
        style={{ width: 32, height: 32 }}
        onClick={onMenuClick}
      >
        <MenuIcon className="size-5" />
      </button>
      <span className="font-semibold text-sm">GPT</span>
      <div className="flex-1" />
      <ModelPicker />
      <ButtonWithTooltip
        variant="outline"
        size="icon"
        tooltip="Share"
        side="bottom"
        className="shrink-0"
      >
        <ShareIcon className="size-4" />
      </ButtonWithTooltip>
    </header>
  );
};

export const Shadcn = () => {
  const sideStyle = "bg-muted/40 px-3 py-2";
  const topStyle = "border-b";
  const leftStyle = "border-r hidden md:block";

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-full w-full">
      <Header onMenuClick={() => setSidebarOpen((v) => !v)} />
      {/* 画面下部: 1=履歴サイドバー画面, 2=チャット入力画面 */}
      <div
        className="grid flex-1 w-full grid-flow-col grid-rows-1"
        style={{ gridTemplateColumns: sidebarOpen ? '250px 1fr' : '1fr' }}
      >
        {/* 1. 履歴サイドバー画面 */}
        {sidebarOpen && (
          <div className={cn(sideStyle, leftStyle, "overflow-y-auto")}> 
            <MainLeft />
          </div>
        )}
        {/* 2. チャット入力画面 */}
        <div className="overflow-hidden bg-background">
          <Thread sidebarOpen={sidebarOpen} />
        </div>
      </div>
    </div>
  );
};
