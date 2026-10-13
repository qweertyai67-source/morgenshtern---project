import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.website) return NextResponse.json({ message: "Сообщение принято." });

  if (
    typeof body.name !== "string" ||
    body.name.trim().length < 2 ||
    typeof body.email !== "string" ||
    !body.email.includes("@") ||
    typeof body.message !== "string" ||
    body.message.trim().length < 10
  ) {
    return NextResponse.json({ message: "Проверьте имя, email и текст сообщения." }, { status: 400 });
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { message: "Добавьте FORMSPREE_ENDPOINT, чтобы включить форму связи." },
      { status: 503 },
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Не удалось отправить сообщение." }, { status: 502 });
  }
  return NextResponse.json({ message: "Сообщение отправлено." });
}
