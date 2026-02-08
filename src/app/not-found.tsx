import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center h-[100vh]">
      <h1 className="font-heading text-6xl font-bold tracking-tight font-dm-mono">404</h1>
      <p className="mt-4 font-body text-lg text-grey-600">
        There isn&#39;t anything here yet.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </div>
    </div>
  );
}
