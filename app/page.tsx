import Link from "next/link";
import { SignInButton, SignUpButton, Show } from "@clerk/nextjs";
import { Link2, Zap, LayoutDashboard, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "Shorten Any URL",
    description:
      "Transform long, unwieldy URLs into clean, shareable short links in seconds.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Redirects",
    description:
      "Our optimized infrastructure ensures your short links redirect instantly.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage Your Links",
    description:
      "Access your personal dashboard to view, organize, and manage all your shortened links.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your links are protected with enterprise-grade authentication and stored in a reliable database.",
  },
];

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create a free account to get started in under a minute.",
  },
  {
    number: "02",
    title: "Paste Your URL",
    description: "Enter any long URL you want to shorten.",
  },
  {
    number: "03",
    title: "Share Instantly",
    description: "Copy your short link and share it anywhere.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Shorten Your Links,{" "}
          <span className="text-primary">Amplify Your Reach</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Create clean, shareable short links in seconds. Manage everything from
          your personal dashboard.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Button size="lg" asChild>
              <Link href="/dashboard" className="gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Show>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-semibold">
            Everything you need
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardHeader>
                    <Icon className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-12 text-3xl font-semibold">How it works</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-3">
                <span className="text-4xl font-bold text-muted-foreground/40">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold">Ready to get started?</h2>
        <p className="mt-4 text-muted-foreground">
          Join thousands of users shortening links every day.
        </p>
        <div className="mt-8">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Create Your Free Account <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Button size="lg" asChild>
              <Link href="/dashboard" className="gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Show>
        </div>
      </section>
    </div>
  );
}

