export default function DetailLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="detail-layout">
            <h1>Detail Page Layout</h1>
            {children}
        </div>
    );
}