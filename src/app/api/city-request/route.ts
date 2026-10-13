import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.website) return NextResponse.json({ message: "Сигнал принят." });

  const city = typeof body.city === "string" ? body.city.trim().slice(0, 100) : "";
  const country = typeof body.country === "string" ? body.country.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : null;
  const consent = body.consent === "yes";

  if (city.length < 2 || country.length < 2) {
    return NextResponse.json({ message: "Укажите город и страну." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { message: "Форма готова. Добавьте Supabase-переменные, чтобы принимать заявки." },
      { status: 503 },
    );
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/city_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ city, country, email: email || null, consent }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Не удалось отправить сигнал. Попробуйте позже." }, { status: 502 });
  }

  return NextResponse.json({ message: "Сигнал принят. Увидимся ближе к сцене." });
}
