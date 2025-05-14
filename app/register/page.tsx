import type React from "react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register - Local Marketplace",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f"
            alt="Authentication"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center">
            Local Marketplace
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Join our community of local sellers and buyers.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to sign up
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-brand underline underline-offset-4">
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 