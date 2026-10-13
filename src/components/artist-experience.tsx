"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { SiteContent } from "@/data/site-content";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

const chapters = [
  { year: "2018", title: "УЛЫБНИСЬ, ДУРАК!", note: "первые альбомы и тотальная самоирония" },
  { year: "2020", title: "ЛЕГЕНДАРНАЯ ПЫЛЬ", note: "альбом как публичный эксперимент" },
  { year: "2021", title: "MILLION DOLLAR", note: "две стороны одной гиперболы" },
  { year: "2022", title: "LAST ONE", note: "более тёмный и внутренний материал" },
  { year: "2025", title: "ALISHER", note: "рок, уязвимость и возвращение к себе" },
  { year: "2026", title: "DEAD SEA LIVE", note: "живой звук в самой низкой точке суши" },
];

function track(event: string, props?: Record<string, string>) {
  window.plausible?.(event, props ? { props } : undefined);
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Marquee() {
  const text = "MORGENSHTERN · ALISHER · MUSIC · LIVE · NO FILTER · ";
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{text.repeat(6)}</div>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StatusMessage({ state }: { state: { kind: "idle" | "loading" | "success" | "error"; text: string } }) {
  if (state.kind === "idle") return null;
  return <p className={`form-status ${state.kind}`} role="status">{state.text}</p>;
}

type FormState = {
  kind: "idle" | "loading" | "success" | "error";
  text: string;
};

export function ArtistExperience({ content }: { content: SiteContent }) {
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletter, setNewsletter] = useState<FormState>({ kind: "idle", text: "" });
  const [cityRequest, setCityRequest] = useState<FormState>({ kind: "idle", text: "" });
  const [contact, setContact] = useState<FormState>({ kind: "idle", text: "" });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.3 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 180]);
  const heroOrbY = useTransform(heroProgress, [0, 1], [0, -110]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;

    const menuButton = menuButtonRef.current;
    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });

    function handleMenuKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
      }
      if (event.key !== "Tab") return;

      const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [])
        .filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleMenuKey);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleMenuKey);
      if (menuButton?.getClientRects().length) menuButton.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  async function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setNewsletter({ kind: "loading", text: "Подключаем…" });

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const result = await response.json();
    setNewsletter({ kind: response.ok ? "success" : "error", text: result.message });
    if (response.ok) {
      form.reset();
      track("Newsletter Signup");
    }
  }

  async function submitCity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setCityRequest({ kind: "loading", text: "Отправляем сигнал…" });

    const response = await fetch("/api/city-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const result = await response.json();
    setCityRequest({ kind: response.ok ? "success" : "error", text: result.message });
    if (response.ok) {
      form.reset();
      track("City Request Submitted");
    }
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setContact({ kind: "loading", text: "Отправляем…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();
      setContact({ kind: response.ok ? "success" : "error", text: result.message });
      if (response.ok) {
        form.reset();
        track("Contact Submitted");
      }
    } catch {
      setContact({ kind: "error", text: "Сеть недоступна. Попробуйте ещё раз." });
    }
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-header" ref={headerRef}>
        <a className="monogram" href="#top" aria-label="Наверх" onClick={() => setMenuOpen(false)}>M*</a>
        <nav id="site-navigation" ref={navigationRef} className={menuOpen ? "open" : ""} aria-label="Основная навигация">
          <a href="#music" onClick={() => setMenuOpen(false)}>Музыка</a>
          <a href="#live" onClick={() => setMenuOpen(false)}>Live</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>История</a>
          <a href="#connect" onClick={() => setMenuOpen(false)}>Связь</a>
        </nav>
        <a className="header-ticket" href="https://morgenshtern.love/#tour-dates" target="_blank" rel="noreferrer" onClick={() => track("Ticket Click", { location: "header" })}>
          Tickets <Arrow />
        </a>
        <button ref={menuButtonRef} className="menu-button" type="button" aria-controls="site-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} onClick={() => setMenuOpen((value) => !value)}>
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </header>

      <main inert={menuOpen}>
      <aside className="demo-banner" aria-label="Демо сайта">
        <div className="demo-banner-label"><strong>DEMO</strong><span>ARTIST DIGITAL PRODUCT</span></div>
        <p>Пример сайта для артиста, бренда или музыкального проекта. <span className="demo-banner-credit">Developed by Velox</span></p>
        <a href="#connect" onClick={() => track("Demo CTA Click", { location: "demo-banner" })}>Обсудить похожий проект <Arrow /></a>
      </aside>
      <section className="hero" id="top" ref={heroRef}>
        <div className="noise" />
        <div className="hero-topline">
          <span>Independent digital concept</span>
          <span>MMXXVI</span>
        </div>
        <motion.div className="hero-orb" style={{ y: heroOrbY }} aria-hidden="true">
          <span className="orb-word orb-word-one">MORGEN</span>
          <span className="orb-word orb-word-two">ALISHER</span>
          <span className="orb-mark">M*</span>
        </motion.div>
        <motion.div className="hero-title-wrap" style={{ y: heroTextY }}>
          <h1 className="hero-title">
            <span>MORGEN</span>
            <span className="outline">SHTERN</span>
          </h1>
        </motion.div>
        <div className="hero-actions">
          <a className="button primary" href="#live">Смотреть live <span>↓</span></a>
          <a className="button ghost" href="#music">Слушать музыку</a>
        </div>
        <div className="hero-caption">
          <span>RAP / ROCK / PERFORMANCE</span>
          <span>SCROLL TO ENTER</span>
        </div>
      </section>

      <Marquee />

      <section className="manifesto section-pad" id="story">
        <Reveal className="manifesto-kicker"><span>01</span> Новая глава</Reveal>
        <Reveal>
          <h2>Не выбирать между<br /><em>маской</em> и человеком.</h2>
        </Reveal>
        <Reveal className="manifesto-grid">
          <p className="big-copy">MORGENSHTERN — персонаж, который научился превращать внимание в искусство.</p>
          <div className="body-copy">
            <p>ALISHER — голос, который становится слышно, когда исчезает лишний шум. Новый визуальный язык соединяет обе стороны: максимализм сцены и уязвимость живого исполнения.</p>
            <p className="source-note">Концепция основана на официальных релизах ALISHER, Dead Sea Live и материалах артиста.</p>
          </div>
        </Reveal>
      </section>

      <section className="release-section" id="live">
        <div className="release-visual">
          <div className="salt-disc" aria-hidden="true">
            <span>LOWEST<br />POINT<br />ON EARTH</span>
          </div>
          <div className="release-label">LIVE ALBUM · 2026</div>
        </div>
        <Reveal className="release-content">
          <span className="section-index">02 / Сейчас</span>
          <h2>DEAD SEA<br /><i>LIVE</i></h2>
          <p>Акустический сет, записанный в Эйн-Бокеке у Мёртвого моря. Знакомые песни остаются без привычной брони: голос, гитара, группа и пустой горизонт.</p>
          <div className="release-buttons">
            <a className="button light" href="https://www.youtube.com/watch?v=Cdvu4rNEOqc" target="_blank" rel="noreferrer" onClick={() => track("Release Play", { release: "dead-sea-live", platform: "youtube" })}>Смотреть полностью <Arrow /></a>
            <a className="text-link" href="https://open.spotify.com/artist/2lWlPk7L8WEuYAsBGDTAnE" target="_blank" rel="noreferrer">Слушать на Spotify <Arrow /></a>
          </div>
        </Reveal>
        <div className="video-shell">
          <iframe
            src="https://www.youtube-nocookie.com/embed/Cdvu4rNEOqc?rel=0"
            title="MORGENSHTERN — Live from the Dead Sea"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="music section-pad" id="music">
        <Reveal className="section-heading">
          <span className="section-index">03 / Релизы</span>
          <h2>Слушай.<br />Не объясняй.</h2>
        </Reveal>
        <div className="release-grid">
          {content.releases.map((release, index) => (
            <Reveal className={`release-card accent-${release.accent}`} key={release.title}>
              <div className="card-number">0{index + 1}</div>
              <div className="card-art" aria-hidden="true"><span>{release.title.slice(0, 1)}</span></div>
              <div className="card-meta"><span>{release.year}</span><span>{release.type}</span></div>
              <h3>{release.title}</h3>
              <p>{release.description}</p>
              <a href={release.href} target="_blank" rel="noreferrer" onClick={() => track("Release Play", { release: release.title, platform: "external" })}>Открыть релиз <Arrow /></a>
            </Reveal>
          ))}
        </div>
        <Reveal className="spotify-shell">
          <div className="spotify-intro">
            <span>THE SOUND</span>
            <p>Главные треки и новые релизы в официальном профиле.</p>
          </div>
          <iframe
            src="https://open.spotify.com/embed/artist/2lWlPk7L8WEuYAsBGDTAnE?utm_source=generator&theme=0"
            title="MORGENSHTERN on Spotify"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </Reveal>
      </section>

      <section className="timeline-section">
        <div className="timeline-sticky">
          <span className="section-index">04 / Архив</span>
          <h2>Эволюция<br />без монтажа</h2>
          <p>Не биография, а шесть точек изменения звука и публичного образа.</p>
        </div>
        <div className="timeline" aria-label="Этапы творчества">
          {chapters.map((chapter, index) => (
            <Reveal className="timeline-item" key={chapter.year}>
              <div className="timeline-count">{String(index + 1).padStart(2, "0")}</div>
              <time>{chapter.year}</time>
              <h3>{chapter.title}</h3>
              <p>{chapter.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="tour section-pad" id="tour">
        <Reveal className="tour-heading">
          <span className="section-index">05 / World Tour</span>
          <h2>Где шум<br />становится <i>живым</i></h2>
        </Reveal>
        <div className="tour-list">
          {content.tourDates.map((show) => (
            <a className="tour-row" href={show.href} target="_blank" rel="noreferrer" key={`${show.date}-${show.city}`} onClick={() => track("Ticket Click", { city: show.city, location: "tour" })}>
              <time>{show.date}</time>
              <strong>{show.city}</strong>
              <span>{show.country}</span>
              <span className="tour-cta">{show.status === "sold-out" ? "SOLD OUT" : "TICKETS ↗"}</span>
            </a>
          ))}
        </div>
        <a className="all-dates" href="https://morgenshtern.love/#tour-dates" target="_blank" rel="noreferrer">Все даты на официальном сайте <Arrow /></a>
      </section>

      <section className="city-signal section-pad" id="connect">
        <Reveal className="signal-copy">
          <span className="section-index">06 / Следующая точка</span>
          <h2>Твой город<br />готов?</h2>
          <p>Оставь сигнал — он поможет увидеть, где аудитория ждёт следующий концерт.</p>
        </Reveal>
        <Reveal>
          <form className="signal-form" onSubmit={submitCity}>
            <label>Город<input name="city" required minLength={2} placeholder="Москва" /></label>
            <label>Страна<input name="country" required minLength={2} placeholder="Россия" /></label>
            <label>Email <span>(необязательно)</span><input name="email" type="email" placeholder="you@example.com" /></label>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className="consent"><input type="checkbox" name="consent" value="yes" /> Сообщить мне, если появится концерт рядом</label>
            <button className="button light submit" type="submit" disabled={cityRequest.kind === "loading"}>Отправить сигнал <span>→</span></button>
            <StatusMessage state={cityRequest} />
          </form>
        </Reveal>
      </section>

      <section className="contact-section section-pad" id="contact">
        <Reveal className="contact-copy">
          <span className="section-index">07 / Direct line</span>
          <h2>Есть<br /><i>дело?</i></h2>
          <p>Букинг, пресса, специальные проекты и партнёрства — одно короткое сообщение без длинной цепочки переходов.</p>
        </Reveal>
        <Reveal>
          <form className="contact-form" onSubmit={submitContact}>
            <div className="contact-fields">
              <label>Имя<input name="name" required minLength={2} placeholder="Ваше имя" /></label>
              <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
            </div>
            <label>Сообщение<textarea name="message" required minLength={10} rows={5} placeholder="Коротко опишите предложение" /></label>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="button contact-submit" type="submit" disabled={contact.kind === "loading"}>Отправить <span>→</span></button>
            <StatusMessage state={contact} />
          </form>
        </Reveal>
      </section>

      <section className="newsletter section-pad">
        <div>
          <span className="section-index">08 / Без алгоритмов</span>
          <h2>Редко.<br />Но по делу.</h2>
        </div>
        <form onSubmit={submitNewsletter}>
          <label htmlFor="newsletter-email">Релизы, билеты и специальные проекты</label>
          <div className="email-line">
            <input id="newsletter-email" name="email" type="email" required placeholder="YOUR@EMAIL.COM" />
            <button type="submit" aria-label="Подписаться" disabled={newsletter.kind === "loading"}>→</button>
          </div>
          <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <StatusMessage state={newsletter} />
        </form>
      </section>

      <footer>
        <div className="footer-word">MORGENSHTERN</div>
        <div className="footer-grid">
          <div><span>Слушать</span><a href="https://open.spotify.com/artist/2lWlPk7L8WEuYAsBGDTAnE" target="_blank" rel="noreferrer">Spotify</a><a href="https://music.apple.com/us/artist/morgenshtern/1371400021" target="_blank" rel="noreferrer">Apple Music</a><a href="https://soundcloud.com/morgenshtern-official" target="_blank" rel="noreferrer">SoundCloud</a></div>
          <div><span>Смотреть</span><a href="https://www.youtube.com/@mmdcrew" target="_blank" rel="noreferrer">YouTube</a><a href="https://t.me/alisherhateu" target="_blank" rel="noreferrer">Telegram</a></div>
          <div><span>Официально</span><a href="https://morgenshtern.love/" target="_blank" rel="noreferrer">Tour & merch</a><a href="https://morgenshtern.show/" target="_blank" rel="noreferrer">Show 2027</a></div>
        </div>
        <div className="footer-legal">
          <span>© 2026 DIGITAL CONCEPT</span>
          <span>Независимый некоммерческий прототип. Не является официальным сайтом артиста.</span>
        </div>
      </footer>
      </main>
    </>
  );
}
