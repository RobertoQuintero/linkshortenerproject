import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Link2,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <Zap className="size-3.5" aria-hidden="true" />
          Fast, reliable link shortening
        </div>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Shorten Links.{" "}
          <span className="text-muted-foreground">Track Performance.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Transform long, unwieldy URLs into clean, shareable links — then watch
          the clicks roll in with real-time analytics.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Get Started Free
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to manage links
            </h2>
            <p className="mt-3 text-muted-foreground">
              Powerful features built for individuals and teams.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Link2 className="size-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Instant Shortening</CardTitle>
                <CardDescription>
                  Paste any URL and get a short link in milliseconds. Share it
                  anywhere with confidence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="size-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Click Analytics</CardTitle>
                <CardDescription>
                  Track how many times your links are clicked with detailed
                  stats and insights over time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="size-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Custom Aliases</CardTitle>
                <CardDescription>
                  Choose your own memorable slug instead of a random string.
                  Make links that are easy to remember.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="size-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Secure & Private</CardTitle>
                <CardDescription>
                  Your links are tied to your account. Only you can manage and
                  delete them.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="size-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Lightning Fast</CardTitle>
                <CardDescription>
                  Redirects happen in under 100ms globally. Fast links keep
                  your audience engaged.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="size-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Link History</CardTitle>
                <CardDescription>
                  Access and manage all your shortened links from the dashboard.
                  Edit or delete anytime.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Up and running in seconds
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to start sharing shorter links.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {[
              {
                step: "01",
                title: "Create an account",
                description:
                  "Sign up for free using your email or social login. No credit card required.",
              },
              {
                step: "02",
                title: "Paste your long URL",
                description:
                  "Enter any URL you want to shorten, optionally provide a custom alias.",
              },
              {
                step: "03",
                title: "Share and track",
                description:
                  "Copy your new short link and share it. Watch analytics update in real time.",
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="flex items-start gap-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-sm font-semibold text-muted-foreground">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to shorten your first link?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of users who trust us to manage their links.
          </p>
          <ul className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center">
            {["Free forever plan", "No credit card needed", "Instant setup"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                  {item}
                </li>
              )
            )}
          </ul>
          <div className="mt-8">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Start Shortening Links
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
