import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter();
  const { handle } = router.query;

  return (
    <div className="bg-background text-text-light min-h-screen p-8">
      <h1 className="text-3xl font-bold">Product: {handle}</h1>
      <p className="mt-4 text-text-muted">Product details and purchase options will appear here.</p>
    </div>
  );
}
