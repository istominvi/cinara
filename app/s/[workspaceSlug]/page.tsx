export default function WorkspaceLandingPage({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-xl font-semibold">
          Workspace: {params.workspaceSlug}
        </h1>
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-xl text-center">
          <p className="text-muted-foreground">
            TODO: загрузить branding из workspace_branding и применить CSS
            variables для темы.
          </p>
        </div>
      </main>
    </div>
  );
}
