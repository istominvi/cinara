import { AuthCard } from "@/components/auth/auth-card";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <div className="w-full max-w-xl rounded-lg border bg-background p-6 shadow">
        <AuthCard />
      </div>
    </div>
  );
}
