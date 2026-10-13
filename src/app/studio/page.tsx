export const dynamic = "force-dynamic";

export default function StudioInfoPage() {
  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32, background: "#080808", color: "#f5f2eb", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 680 }}>
        <p style={{ color: "#f2351f", fontWeight: 800, letterSpacing: ".14em" }}>SANITY STUDIO</p>
        <h1 style={{ fontSize: "clamp(42px, 8vw, 92px)", lineHeight: .85, margin: "20px 0", letterSpacing: "-.06em" }}>РЕДАКТОР ЖИВЁТ ОТДЕЛЬНО</h1>
        <p style={{ lineHeight: 1.6, opacity: .72 }}>Studio подготовлена в папке <code>studio/</code>. Отдельное размещение не добавляет административный CLI в публичный bundle и позволяет независимо управлять доступом редакторов.</p>
        {studioUrl ? <a href={studioUrl} style={{ display: "inline-block", marginTop: 24, padding: "16px 20px", background: "#f2351f", color: "white", fontWeight: 800 }}>Открыть Studio ↗</a> : <p style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #333", opacity: .62 }}>Добавьте NEXT_PUBLIC_SANITY_STUDIO_URL после публикации Studio.</p>}
      </div>
    </main>
  );
}
