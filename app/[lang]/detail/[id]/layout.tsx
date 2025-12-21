import './detail.css';

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Shopping List</h1>
      {children}
    </div>
  );
}