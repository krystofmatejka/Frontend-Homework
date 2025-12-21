import './home.css';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Shopping Lists</h1>
      {children}
    </div>
  );
}
