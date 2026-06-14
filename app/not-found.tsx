import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-50 dark:opacity-30" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(53,99,255,0.35),transparent)] blur-2xl" />
      </div>
      <div className="flex flex-col items-center text-center">
        <Logo />
        <p className="mt-10 font-display text-7xl font-bold tracking-tight text-gradient sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          This page wandered off the dashboard
        </h1>
        <p className="mt-3 max-w-md text-balance text-slate-600 dark:text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to the insights.
        </p>
        <Link href="/" className="mt-8">
          <Button size="lg">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </div>
    </main>
  );
}
