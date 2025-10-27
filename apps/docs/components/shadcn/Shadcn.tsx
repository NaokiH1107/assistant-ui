"use client";

import { MenuIcon, SettingsIcon } from "lucide-react";
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
  return (
    <div className="flex flex-col gap-2 pt-2 h-full">
      {/* +新規チャットボタン サイドバー上部 */}
      <Button variant="outline" className="w-full justify-start font-normal text-base" aria-label="新規チャット">
        ＋新規チャット
      </Button>
      <div className="flex-1 min-h-0">
        <ThreadList />
      </div>
      {/* サイドバー下部のボタン/リンク群 */}
      <div className="flex flex-col gap-2 pt-4 pb-2">
        {/* 次の30件を取得（青ボタン） */}
        <Button variant="default" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-normal text-base text-center" aria-label="次の30件を取得">
          次の30件を取得
        </Button>
        {/* GPTポータルサイト（グレー背景・黒文字・中央揃え） */}
        <Button variant="ghost" className="w-full bg-gray-200 hover:bg-gray-300 text-black font-normal text-base text-center justify-center" aria-label="GPTポータルサイト">
          GPTポータルサイト
        </Button>
        {/* 生成AIガイドライン（オレンジ背景・白文字・中央揃え） */}
        <Button variant="ghost" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-normal text-base text-center justify-center" aria-label="生成AIガイドライン">
          生成AIガイドライン
        </Button>
        {/* 操作マニュアル（オレンジ背景・白文字・中央揃え） */}
        <Button variant="ghost" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-normal text-base text-center justify-center" aria-label="操作マニュアル">
          操作マニュアル
        </Button>
      </div>
    </div>
  );
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
      <div style={{ minWidth: 120, maxWidth: 180, width: '50%' }}>
        <ModelPicker />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="shrink-0"
        aria-label="Settings"
      >
        <SettingsIcon className="size-4" />
      </Button>
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
