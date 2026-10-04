export function generateStaticParams() {
  return [{ id: "coming-soon" }];
}

export default function Page() {
  return <div className="p-8 font-bold">Coming Soon</div>;
}