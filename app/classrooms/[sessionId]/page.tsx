export default function ClassroomPage({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Занятие {params.sessionId}</h1>
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-5xl overflow-hidden rounded-lg border">
          <iframe
            title="Jitsi Classroom"
            className="h-[70vh] w-full"
            src={`https://meet.jit.si/${params.sessionId}`}
            allow="camera; microphone; fullscreen; display-capture"
          />
        </div>
      </main>
    </div>
  );
}
