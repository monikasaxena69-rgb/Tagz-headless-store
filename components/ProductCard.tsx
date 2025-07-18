type ProductCardProps = { title: string; };

export default function ProductCard({ title }: ProductCardProps) {
  return (
    <div className="bg-background border border-text-muted p-4 rounded-lg">
      <h3 className="text-lg text-text-light">{title}</h3>
    </div>
  );
}
