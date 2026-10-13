import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (body.website) return NextResponse.json({ message: "Спасибо." });
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Проверьте email." }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Форма готова. Добавьте BREVO_API_KEY, чтобы включить подписку." },
      { status: 503 },
    );
  }

  const listId = Number(process.env.BREVO_LIST_ID);
  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      ...(Number.isFinite(listId) ? { listIds: [listId] } : {}),
    }),
  });

  if (!response.ok && response.status !== 204) {
    return NextResponse.json({ message: "Не удалось подписать. Попробуйте позже." }, { status: 502 });
  }

  return NextResponse.json({ message: "Готово. Вы в списке." });
}
