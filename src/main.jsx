import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  HashRouter,
  NavLink,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Menu,
  X,
  MessageCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Banknote,
  Smartphone,
  Expand,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/cairo/arabic-400.css";
import "@fontsource/cairo/arabic-600.css";
import "@fontsource/cairo/arabic-700.css";
import {
  plans,
  facilities,
  trainers,
  classes,
  days,
  schedule,
  nav,
  faqs,
  disclaimer,
} from "./data";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);
const Language = createContext();
const useLang = () => useContext(Language);
const media = (name) => `${import.meta.env.BASE_URL}media/${name}.webp`;
const money = (value) => value.toLocaleString("en-US");
function Picture({ name, alt, className = "", eager = false, ...props }) {
  const portrait = trainers.findIndex((c) => c.id === name);
  const img = (
    <img
      className={className}
      src={media(portrait >= 0 ? "trainers" : name)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      style={
        portrait >= 0
          ? {
              width: "300%",
              height: "200%",
              maxWidth: "none",
              position: "absolute",
              left: `-${(portrait % 3) * 100}%`,
              top: `-${Math.floor(portrait / 3) * 100}%`,
            }
          : undefined
      }
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = `${import.meta.env.BASE_URL}media/fallback.svg`;
        if (portrait >= 0)
          Object.assign(e.currentTarget.style, {
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          });
      }}
      {...props}
    />
  );
  return portrait >= 0 ? <span className="portrait-sprite">{img}</span> : img;
}
function Wordmark() {
  return (
    <span className="wordmark" dir="ltr">
      <span className="brand-symbol" aria-hidden="true">
        F
      </span>
      <span>
        FORGE<small>ATHLETIC CLUB</small>
      </span>
    </span>
  );
}
function WA({ message, children, className = "", icon = true }) {
  return (
    <a
      className={`button ${className}`}
      href={`https://wa.me/201277741748?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {icon && <ArrowUpRight size={18} aria-hidden="true" />}
    </a>
  );
}
function SectionHeading({ eyebrow, title, link, to }) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {to && (
        <Link className="text-link" to={to}>
          {link}
          <ArrowUpRight size={19} />
        </Link>
      )}
    </div>
  );
}
function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("forge-language") === "ar" ? "ar" : "en";
    } catch {
      return "en";
    }
  });
  const t = (pair) => pair[lang === "ar" ? 1 : 0];
  const location = useLocation();
  const mainRef = useRef(null);
  const first = useRef(true);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("forge-language", lang);
    } catch {}
  }, [lang]);
  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!first.current) mainRef.current?.focus({ preventScroll: true });
    first.current = false;
  }, [location.pathname]);
  useEffect(() => {
    const item = nav.find((n) => n.path === location.pathname);
    const title = `${item ? t(item.name) : t(["Page not found", "الصفحة غير موجودة"])} | FORGE Athletic Club`;
    document.title = title;
    document.querySelector('[property="og:title"]').content = title;
    const description = t([
      "Explore memberships, training spaces and class schedules at FORGE, a fictional 24/7 athletic club concept in Sheraton, Cairo.",
      "اكتشف الاشتراكات ومرافق التدريب وجدول الحصص في فورج، فكرة خيالية لنادٍ رياضي يعمل على مدار الساعة في شيراتون، القاهرة.",
    ]);
    document.querySelector('[name="description"]').content = description;
    document.querySelector('[property="og:description"]').content = description;
  }, [location.pathname, lang]);
  useLayoutEffect(() => {
    const match = gsap.matchMedia();
    match.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-line", {
          y: 65,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
        gsap.utils
          .toArray(".reveal")
          .forEach((el) =>
            gsap.from(el, {
              y: 24,
              opacity: 0,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }),
          );
      }, mainRef);
      return () => ctx.revert();
    });
    return () => match.revert();
  }, [location.pathname, lang]);
  useEffect(() => {
    if (!menu) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.querySelector(".menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  const join = t([
    "Hello FORGE, I would like to ask about membership.",
    "مرحبًا فورج، أود الاستفسار عن الاشتراكات.",
  ]);
  return (
    <Language.Provider value={{ lang, t }}>
      <a
        href="#main-content"
        className="skip"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        {t(["Skip to content", "انتقل إلى المحتوى"])}
      </a>
      <header className="site-header">
        <Link to="/" aria-label={t(["FORGE home", "فورج الرئيسية"])}>
          <Wordmark />
        </Link>
        <nav
          className="desktop-nav"
          aria-label={t(["Main navigation", "التنقل الرئيسي"])}
        >
          {nav.slice(1).map((n) => (
            <NavLink key={n.path} to={n.path}>
              {t(n.name)}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language"
            onClick={() => {
              setLang(lang === "en" ? "ar" : "en");
              setMenu(false);
            }}
            aria-label={t(["Switch to Arabic", "التبديل إلى الإنجليزية"])}
          >
            {lang === "en" ? "العربية" : "EN"}
            <span aria-hidden="true">↗</span>
          </button>
          <WA className="lime header-join" message={join}>
            {t(["Join the club", "انضم للنادي"])}
          </WA>
          <button
            className="menu-toggle icon-button"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            aria-label={t([
              menu ? "Close menu" : "Open menu",
              menu ? "إغلاق القائمة" : "فتح القائمة",
            ])}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label={t(["Mobile navigation", "قائمة الهاتف"])}
          >
            {nav.map((n) => (
              <NavLink key={n.path} to={n.path} onClick={() => setMenu(false)}>
                {t(n.name)}
                <ArrowUpRight size={22} />
              </NavLink>
            ))}
            <WA className="lime" message={join}>
              {t(["Join the club", "انضم للنادي"])}
            </WA>
          </nav>
        )}
      </header>
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="container page-top">
                <h1>{t(["Page not found", "الصفحة غير موجودة"])}</h1>
                <Link className="button lime" to="/">
                  {t(["Back to home", "العودة للرئيسية"])}
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
      <div className="mobile-cta">
        <span>
          <strong>{t(["OPEN 24/7", "مفتوح ٢٤/٧"])}</strong>
          <small>{t(["Sheraton, Cairo", "شيراتون، القاهرة"])}</small>
        </span>
        <WA message={join} className="lime">
          <MessageCircle size={18} />
          {t(["Join on WhatsApp", "تواصل عبر واتساب"])}
        </WA>
      </div>
    </Language.Provider>
  );
}
function Home() {
  const { t } = useLang();
  return (
    <>
      <section className="hero">
        <Picture
          name="hero"
          alt={t([
            "Atmospheric strength training floor",
            "صالة تدريب قوة بإضاءة سينمائية",
          ])}
          className="hero-image"
          eager
        />
        <div className="hero-shade" />
        <div className="hero-content container">
          <p className="eyebrow hero-line">
            <span />
            {t([
              "SHERATON, CAIRO · OPEN 24/7",
              "شيراتون، القاهرة · مفتوح ٢٤/٧",
            ])}
          </p>
          <h1>
            <span className="hero-line">
              {t(["TRAIN HARDER.", "تمرّن بقوة."])}
            </span>
            <span className="hero-line accent">
              {t(["ANYTIME.", "في أي وقت."])}
            </span>
          </h1>
          <p className="hero-sub hero-line">
            {t(["Your time. Your pace. Your club.", "وقتك. إيقاعك. ناديك."])}
          </p>
          <div className="hero-buttons hero-line">
            <Link className="button lime" to="/memberships">
              {t(["Explore memberships", "اكتشف الاشتراكات"])}
              <ArrowUpRight size={20} />
            </Link>
            <WA
              className="outline"
              message={t([
                "Hello FORGE, I would like to join the club.",
                "مرحبًا فورج، أود الانضمام للنادي.",
              ])}
            >
              <MessageCircle size={18} />
              {t(["Join on WhatsApp", "انضم عبر واتساب"])}
            </WA>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>{t(["BUILT FOR YOUR EVERYDAY.", "مصمم لكل يوم."])}</span>
          <a
            href="#discover"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("discover")
                .scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                });
            }}
          >
            {t(["EXPLORE THE CLUB", "اكتشف النادي"])}
            <ChevronDown size={17} />
          </a>
          <span className="hero-index">01 / 05</span>
        </div>
      </section>
      <div className="facts" id="discover">
        <div>
          <Clock3 />
          <strong>24/7</strong>
          <span>{t(["GYM FLOOR ACCESS", "دخول صالة الجيم"])}</span>
        </div>
        <div>
          <span className="fact-number">03</span>
          <span>{t(["CLASS DISCIPLINES", "تخصصات الحصص"])}</span>
        </div>
        <div>
          <span className="fact-number">06</span>
          <span>{t(["SPECIALIST COACHES", "مدربين متخصصين"])}</span>
        </div>
        <div>
          <MapPin />
          <strong>{t(["SHERATON", "شيراتون"])}</strong>
          <span>{t(["CAIRO, EGYPT", "القاهرة، مصر"])}</span>
        </div>
      </div>
      <section className="container section">
        <SectionHeading
          eyebrow={t(["THE TRAINING FLOOR", "صالة التدريب"])}
          title={t(["SPACE TO GET STRONGER.", "مساحة لتصبح أقوى."])}
          to="/facilities"
          link={t(["Explore all facilities", "اكتشف كل المرافق"])}
        />
        <div className="feature-grid">
          {facilities.slice(0, 3).map((f, i) => (
            <Link
              className={`feature-card reveal feature-${i}`}
              key={f.id}
              to="/facilities"
            >
              <Picture name={f.id} alt={t(f.name)} />
              <div className="image-shade" />
              <span className="card-number">0{i + 1}</span>
              <div className="feature-caption">
                <div>
                  <h3>{t(f.name)}</h3>
                  <p>{t(f.desc)}</p>
                </div>
                <span className="circle-arrow">
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section membership-section">
        <div className="container">
          <SectionHeading
            eyebrow={t(["YOUR CLUB. YOUR COMMITMENT.", "ناديك. التزامك."])}
            title={t(["MAKE YOUR MOVE.", "خذ خطوتك."])}
            to="/memberships"
            link={t(["Compare memberships", "قارن الاشتراكات"])}
          />
          <PlanCards />
          <p className="fine-print">
            {t([
              "Illustrative prices in EGP. No online payments.",
              "أسعار توضيحية بالجنيه المصري. لا يوجد دفع إلكتروني.",
            ])}
          </p>
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow={t(["THE PEOPLE IN YOUR CORNER", "فريق يدعمك"])}
          title={t(["MEET YOUR COACHES.", "تعرّف على مدربيك."])}
          to="/facilities#coaches"
          link={t(["Meet all six coaches", "تعرّف على المدربين الستة"])}
        />
        <TrainerGrid preview />
      </section>
      <section className="container section border-top">
        <SectionHeading
          eyebrow={t(["SHOW UP. GET TO WORK.", "احضر. وابدأ التدريب."])}
          title={t(["FIND YOUR SESSION.", "اختر حصتك."])}
          to="/classes"
          link={t(["View weekly schedule", "شاهد الجدول الأسبوعي"])}
        />
        <ClassCards />
      </section>
      <VisitBanner />
    </>
  );
}
function PlanCards() {
  const { t } = useLang();
  return (
    <div className="plans">
      {plans.map((p, i) => (
        <article
          key={p.id}
          className={`plan reveal ${i === 1 ? "featured" : ""}`}
        >
          <div className="plan-top">
            <p className="eyebrow">
              0{i + 1} / {t(p.name)}
            </p>
            {i === 1 && (
              <span className="badge">{t(["CLUB PICK", "اختيار النادي"])}</span>
            )}
          </div>
          <h3>{t(p.label)}</h3>
          <div className="price" dir="ltr">
            {money(p.price)} <span>{t(["EGP", "ج.م"])}</span>
          </div>
          <p className="billing">
            {t([
              `Billed every ${p.months === 1 ? "month" : p.months + " months"}`,
              p.months === 1 ? "تُدفع كل شهر" : `تُدفع كل ${p.months} أشهر`,
            ])}
          </p>
          <ul>
            {[
              ["24/7 gym floor access", "دخول صالة الجيم على مدار الساعة"],
              [
                "Strength, cardio & functional zones",
                "مناطق القوة والكارديو والتدريب الوظيفي",
              ],
              ["Locker rooms & showers", "غرف تبديل الملابس والدُش"],
            ].map((v) => (
              <li key={v[0]}>
                <Check size={16} />
                {t(v)}
              </li>
            ))}
          </ul>
          <div className="plan-equivalent">
            {t(["Equivalent to", "ما يعادل"])}{" "}
            <b>
              {money(p.price / p.months)} {t(["EGP / month", "ج.م / شهر"])}
            </b>
          </div>
          <WA
            className={i === 1 ? "dark" : "outline"}
            message={t([
              `Hello FORGE, I would like to ask about the ${p.name[0]} membership.`,
              `مرحبًا فورج، أود الاستفسار عن الاشتراك ${p.name[1]}.`,
            ])}
          >
            {t(["Ask about this plan", "استفسر عن الاشتراك"])}
          </WA>
        </article>
      ))}
    </div>
  );
}
function TrainerGrid({ preview = false }) {
  const { t } = useLang();
  const list = preview ? [trainers[0], trainers[2], trainers[5]] : trainers;
  return (
    <div className={`trainers ${preview ? "swipe" : ""}`}>
      {list.map((c) => (
        <article className="trainer reveal" key={c.id}>
          <div className="trainer-image">
            <Picture
              name={c.id}
              alt={t([
                `Illustrative portrait for fictional coach ${c.name[0]}`,
                `صورة توضيحية للمدرب الخيالي ${c.name[1]}`,
              ])}
            />
            <span className="trainer-tag">
              {t(["FORGE COACH", "مدرب فورج"])}
            </span>
          </div>
          <p>{t(c.specialty)}</p>
          <h3>{t(c.name)}</h3>
          <WA
            className="trainer-book"
            message={t([
              `Hello FORGE, I would like to book a session with ${c.name[0]}.`,
              `مرحبًا فورج، أود حجز جلسة مع ${c.name[1]}.`,
            ])}
          >
            {t(["Book a session", "احجز جلسة"])}
          </WA>
        </article>
      ))}
    </div>
  );
}
function ClassCards() {
  const { t } = useLang();
  return (
    <div className="class-cards">
      {Object.entries(classes).map(([id, c], i) => (
        <Link className="class-card reveal" key={id} to={`/classes?type=${id}`}>
          <Picture name={c.image} alt={t(c.name)} />
          <div className="image-shade" />
          <span className="card-number">0{i + 1}</span>
          <div>
            <h3>{t(c.name)}</h3>
            <p>{t(c.desc)}</p>
            <ArrowUpRight />
          </div>
        </Link>
      ))}
    </div>
  );
}
function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="page-top container">
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h1 className="hero-line">{title}</h1>
      <p className="page-description">{description}</p>
    </div>
  );
}
function Facilities() {
  const { t } = useLang();
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#coaches") {
      const id = setTimeout(
        () => document.getElementById("coaches")?.scrollIntoView(),
        100,
      );
      return () => clearTimeout(id);
    }
  }, [location.hash]);
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      const before = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = before;
      };
    }
  }, [selected]);
  const close = () => {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  };
  return (
    <>
      <PageIntro
        eyebrow={t(["FACILITIES & TRAINING", "المرافق والتدريب"])}
        title={t(["BUILT FOR THE WORK.", "مصمم للتدريب."])}
        description={t([
          "Eight spaces. Every part of your training covered.",
          "ثماني مساحات لكل تفاصيل تدريبك.",
        ])}
      />
      <section className="container facility-grid">
        {facilities.map((f, i) => (
          <article className="facility reveal" key={f.id}>
            <button
              className="facility-image"
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setSelected(i);
              }}
              aria-label={t([
                `View ${f.name[0]} image`,
                `عرض صورة ${f.name[1]}`,
              ])}
            >
              <Picture name={f.id} alt={t(f.name)} />
              <span className="expand">
                <Expand size={19} />
              </span>
            </button>
            <div className="facility-label">
              <span>0{i + 1}</span>
              <div>
                <h2>{t(f.name)}</h2>
                <p>{t(f.desc)}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="container section" id="coaches">
        <SectionHeading
          eyebrow={t(["EXPERTISE IN EVERY CORNER", "خبرة في كل ركن"])}
          title={t(["YOUR TRAINING TEAM.", "فريق تدريبك."])}
        />
        <TrainerGrid />
        <p className="fine-print">
          {t([
            "Fictional coach profiles and illustrative portraits. Session arrangements are discussed on WhatsApp.",
            "ملفات مدربين خيالية وصور توضيحية. تتم مناقشة ترتيبات الجلسات عبر واتساب.",
          ])}
        </p>
      </section>
      <VisitBanner />
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight")
            setSelected((selected + 1) % facilities.length);
          if (e.key === "ArrowLeft")
            setSelected((selected + facilities.length - 1) % facilities.length);
        }}
      >
        {selected !== null && (
          <div className="lightbox-inner">
            <button
              className="icon-button lightbox-close"
              onClick={close}
              aria-label={t(["Close gallery", "إغلاق المعرض"])}
            >
              <X />
            </button>
            <Picture
              name={facilities[selected].id}
              alt={t(facilities[selected].name)}
              eager
            />
            <div className="lightbox-controls">
              <button
                className="icon-button"
                onClick={() =>
                  setSelected(
                    (selected + facilities.length - 1) % facilities.length,
                  )
                }
                aria-label={t(["Previous image", "الصورة السابقة"])}
              >
                <ChevronLeft />
              </button>
              <p aria-live="polite">
                {t(facilities[selected].name)} · {selected + 1} / 8
              </p>
              <button
                className="icon-button"
                onClick={() => setSelected((selected + 1) % facilities.length)}
                aria-label={t(["Next image", "الصورة التالية"])}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
function Classes() {
  const { t, lang } = useLang();
  const location = useLocation();
  const initial = new URLSearchParams(location.search).get("type");
  const [type, setType] = useState(classes[initial] ? initial : "all");
  const [day, setDay] = useState("all");
  useEffect(() => {
    const next = new URLSearchParams(location.search).get("type");
    setType(classes[next] ? next : "all");
  }, [location.search]);
  const filtered = schedule.filter(
    (s) =>
      (day === "all" || s.day === day) && (type === "all" || s.type === type),
  );
  return (
    <>
      <PageIntro
        eyebrow={t(["CLASSES & SCHEDULE", "الحصص والجدول"])}
        title={t(["YOUR WEEK. IN MOTION.", "أسبوعك كله حركة."])}
        description={t([
          "CrossFit. MMA. Boxing. Find your next session.",
          "كروس فيت. فنون قتالية مختلطة. ملاكمة. اختر حصتك القادمة.",
        ])}
      />
      <section className="container">
        <ClassCards />
        <div className="schedule-panel section">
          <div className="schedule-heading">
            <h2>{t(["WEEKLY LINE-UP", "الجدول الأسبوعي"])}</h2>
            <span className="time-note">
              <Clock3 size={16} />
              {t([
                "Cairo local time · Africa/Cairo",
                "بتوقيت القاهرة المحلي · مصر",
              ])}
            </span>
          </div>
          <div className="filter-bar">
            <div
              className="class-filter"
              aria-label={t(["Filter by class", "تصفية حسب الحصة"])}
            >
              {["all", ...Object.keys(classes)].map((v) => (
                <button
                  key={v}
                  aria-pressed={type === v}
                  className={type === v ? "selected" : ""}
                  onClick={() => setType(v)}
                >
                  {v === "all"
                    ? t(["All classes", "كل الحصص"])
                    : t(classes[v].name)}
                </button>
              ))}
            </div>
            <label className="day-filter">
              {t(["Day", "اليوم"])}
              <select
                value={day}
                onChange={(e) =>
                  setDay(
                    e.target.value === "all" ? "all" : Number(e.target.value),
                  )
                }
              >
                <option value="all">{t(["All week", "كل الأسبوع"])}</option>
                {days.map((d, i) => (
                  <option value={i} key={i}>
                    {t(d)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="schedule-list" aria-live="polite">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <h3>
                  {t([
                    "No sessions match these filters.",
                    "لا توجد حصص تطابق اختياراتك.",
                  ])}
                </h3>
                <button
                  className="text-link"
                  onClick={() => {
                    setDay("all");
                    setType("all");
                  }}
                >
                  {t(["Reset filters", "إعادة ضبط التصفية"])}
                  <ArrowRight />
                </button>
              </div>
            ) : (
              filtered.map((s) => {
                const c = classes[s.type];
                const coach = trainers[c.coach];
                const time =
                  lang === "en"
                    ? `${s.hour - 12}:00 PM`
                    : `${s.hour - 12}:00 مساءً`;
                return (
                  <article className="schedule-row" key={s.day}>
                    <div className="schedule-day">
                      {t(days[s.day])}
                      <span>{time}</span>
                    </div>
                    <div className="schedule-class">
                      <span className={`discipline-dot ${s.type}`} />
                      <h3>{t(c.name)}</h3>
                      <small>{t(["60 min", "٦٠ دقيقة"])}</small>
                    </div>
                    <p className="coach-name">
                      {t(["Coach", "المدرب"])}
                      <span>{t(coach.name)}</span>
                    </p>
                    <WA
                      className="outline"
                      message={t([
                        `Hello FORGE, I would like to ask about the ${c.name[0]} class on ${days[s.day][0]} at ${s.hour - 12}:00 PM.`,
                        `مرحبًا فورج، أود الاستفسار عن حصة ${c.name[1]} يوم ${days[s.day][1]} الساعة ${s.hour - 12}:00 مساءً.`,
                      ])}
                    >
                      {t(["Ask to book", "استفسر للحجز"])}
                    </WA>
                  </article>
                );
              })
            )}
          </div>
          <p className="fine-print">
            {t([
              "Illustrative weekly schedule. All sessions last 60 minutes. WhatsApp inquiries do not confirm a booking.",
              "جدول أسبوعي توضيحي. مدة كل حصة ٦٠ دقيقة. الاستفسار عبر واتساب لا يُعد تأكيدًا للحجز.",
            ])}
          </p>
        </div>
      </section>
      <VisitBanner />
    </>
  );
}
function Memberships() {
  const { t } = useLang();
  const [selected, setSelected] = useState("quarterly");
  const p = plans.find((p) => p.id === selected);
  return (
    <>
      <PageIntro
        eyebrow={t(["MEMBERSHIPS", "الاشتراكات"])}
        title={t(["COMMIT TO YOURSELF.", "استثمر في نفسك."])}
        description={t([
          "Three plans. One training floor. Open around the clock.",
          "ثلاثة اشتراكات. صالة واحدة. مفتوحة على مدار الساعة.",
        ])}
      />
      <section className="container">
        <PlanCards />
        <p className="fine-print">
          {t([
            "All prices are fictional demonstration prices in Egyptian pounds. Ask about class and personal training arrangements separately.",
            "جميع الأسعار توضيحية بالجنيه المصري. استفسر بشكل منفصل عن ترتيبات الحصص والتدريب الشخصي.",
          ])}
        </p>
      </section>
      <section className="container section">
        <div className="calculator reveal">
          <div>
            <p className="eyebrow">
              <span />
              {t(["DO THE NUMBERS", "احسب اشتراكك"])}
            </p>
            <h2>
              {t(["YOUR PLAN.\nYOUR TOTAL.", "اشتراكك.\nإجمالي التكلفة."])}
            </h2>
            <p>
              {t([
                "Choose your commitment and compare the cost.",
                "اختر مدة اشتراكك وقارن التكلفة.",
              ])}
            </p>
            <fieldset>
              <legend>{t(["Select your membership", "اختر اشتراكك"])}</legend>
              <div className="plan-selector">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={plan.id === selected ? "chosen" : ""}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={plan.id === selected}
                      onChange={() => setSelected(plan.id)}
                    />
                    {t(plan.name)}
                    <Check size={16} />
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="calculator-result" aria-live="polite">
            <span className="eyebrow">
              {t(["TOTAL MEMBERSHIP COST", "إجمالي تكلفة الاشتراك"])}
            </span>
            <div className="calc-price" key={p.id}>
              {money(p.price)} <small>{t(["EGP", "ج.م"])}</small>
            </div>
            <div className="calculation-line">
              <span>{t(["Membership length", "مدة الاشتراك"])}</span>
              <b>
                {p.months} {t([p.months === 1 ? "month" : "months", "شهر"])}
              </b>
            </div>
            <div className="calculation-line">
              <span>{t(["Monthly equivalent", "المعادل الشهري"])}</span>
              <b>
                {money(p.price / p.months)} {t(["EGP", "ج.م"])}
              </b>
            </div>
            <div className="calculation-line savings">
              <span>
                {t([
                  "Savings vs. monthly plan",
                  "التوفير مقارنة بالدفع الشهري",
                ])}
              </span>
              <b>
                {money(p.months * 2200 - p.price)} {t(["EGP", "ج.م"])}
              </b>
            </div>
            <WA
              className="lime"
              message={t([
                `Hello FORGE, I would like to ask about the ${p.name[0]} membership for ${money(p.price)} EGP.`,
                `مرحبًا فورج، أود الاستفسار عن الاشتراك ${p.name[1]} بسعر ${money(p.price)} جنيه مصري.`,
              ])}
            >
              {t(["Ask about my plan", "استفسر عن اختياري"])}
            </WA>
          </div>
        </div>
      </section>
      <VisitBanner />
    </>
  );
}
function VisitBanner() {
  const { t } = useLang();
  return (
    <section className="visit-banner">
      <div className="container visit-layout">
        <div>
          <p className="eyebrow">
            <span />
            {t(["SHERATON HELIOPOLIS, CAIRO", "شيراتون هليوبوليس، القاهرة"])}
          </p>
          <h2>{t(["COME FEEL THE DIFFERENCE.", "تعال واكتشف الفرق."])}</h2>
          <p>
            {t([
              "Gym floor open 24/7. Coaches by schedule.",
              "صالة الجيم مفتوحة ٢٤/٧. المدربون حسب الجدول.",
            ])}
          </p>
        </div>
        <div className="visit-actions">
          <WA
            className="lime"
            message={t([
              "Hello FORGE, I would like to arrange a gym tour.",
              "مرحبًا فورج، أود ترتيب جولة في الجيم.",
            ])}
          >
            {t(["Arrange a gym tour", "رتّب جولة في الجيم"])}
          </WA>
          <Link className="text-link" to="/contact">
            {t(["Location & opening hours", "الموقع وساعات العمل"])}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const { t } = useLang();
  const map =
    "https://www.google.com/maps/search/?api=1&query=Sheraton+Heliopolis+Cairo+Egypt";
  return (
    <>
      <PageIntro
        eyebrow={t(["CONTACT & VISIT", "تواصل وزيارة"])}
        title={t(["YOUR NEXT MOVE\nSTARTS HERE.", "خطوتك القادمة\nتبدأ هنا."])}
        description={t([
          "Questions, memberships or a look around. Let’s talk.",
          "استفسارات أو اشتراكات أو جولة في المكان. تواصل معنا.",
        ])}
      />
      <section className="container contact-grid">
        <div className="contact-details">
          <div className="contact-item">
            <MapPin />
            <div>
              <p className="eyebrow">{t(["FIND US", "الموقع"])}</p>
              <h2>{t(["SHERATON HELIOPOLIS", "شيراتون هليوبوليس"])}</h2>
              <p>{t(["Cairo, Egypt", "القاهرة، مصر"])}</p>
              <a
                className="text-link"
                href={map}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t([
                  "Explore the area on Google Maps",
                  "استكشف المنطقة على خرائط جوجل",
                ])}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="contact-item">
            <Clock3 />
            <div>
              <p className="eyebrow">{t(["OPENING HOURS", "ساعات العمل"])}</p>
              <h2>{t(["GYM FLOOR: 24/7", "صالة الجيم: ٢٤/٧"])}</h2>
              <p>
                {t([
                  "Coaches and group classes by schedule.",
                  "المدربون والحصص الجماعية حسب الجدول.",
                ])}
              </p>
              <Link className="text-link" to="/classes">
                {t(["See the class schedule", "شاهد جدول الحصص"])}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div className="contact-item">
            <MessageCircle />
            <div>
              <p className="eyebrow">{t(["LET’S TALK", "تواصل معنا"])}</p>
              <h2 dir="ltr">012 7774 1748</h2>
              <WA
                className="lime"
                message={t([
                  "Hello FORGE, I would like to arrange a gym tour.",
                  "مرحبًا فورج، أود ترتيب جولة في الجيم.",
                ])}
              >
                {t(["Arrange a gym tour", "رتّب جولة في الجيم"])}
              </WA>
            </div>
          </div>
        </div>
        <a
          href={map}
          target="_blank"
          rel="noopener noreferrer"
          className="area-map"
          aria-label={t([
            "Open Sheraton Heliopolis area in Google Maps",
            "افتح منطقة شيراتون هليوبوليس على خرائط جوجل",
          ])}
        >
          <div className="map-grid" aria-hidden="true" />
          <div className="map-marker">
            <MapPin size={34} />
            <strong>{t(["SHERATON", "شيراتون"])}</strong>
            <span>{t(["HELIOPOLIS · CAIRO", "هليوبوليس · القاهرة"])}</span>
          </div>
          <span className="map-note">
            {t([
              "AREA GUIDE · NO EXACT GYM LOCATION",
              "دليل المنطقة · لا يوجد موقع محدد للجيم",
            ])}
          </span>
          <span className="map-open">
            {t(["Open Google Maps", "افتح خرائط جوجل"])}
            <ArrowUpRight />
          </span>
        </a>
      </section>
      <section className="container section faq-layout">
        <div>
          <p className="eyebrow">
            <span />
            {t(["GOOD TO KNOW", "معلومات تهمك"])}
          </p>
          <h2>{t(["A FEW QUICK ANSWERS.", "إجابات سريعة."])}</h2>
          <div className="payments">
            <p>
              {t(["Payment methods · illustrative", "طرق الدفع · توضيحية"])}
            </p>
            <div>
              {[
                [Banknote, ["Cash", "نقدًا"]],
                [CreditCard, ["Bank cards", "بطاقات بنكية"]],
                [Smartphone, ["InstaPay", "إنستاباي"]],
              ].map(([Icon, label]) => (
                <span key={label[0]}>
                  <Icon size={18} />
                  {t(label)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="faqs">
          {faqs.map((f) => (
            <details key={f.q[0]}>
              <summary>
                {t(f.q)}
                <Plus size={20} />
              </summary>
              <p>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" aria-label={t(["FORGE home", "فورج الرئيسية"])}>
            <Wordmark />
          </Link>
          <p>{t(["TRAIN HARDER. ANYTIME.", "تمرّن بقوة. في أي وقت."])}</p>
          <a
            href={`https://wa.me/201277741748?text=${encodeURIComponent(t(["Hello FORGE, I would like to ask about the club.", "مرحبًا فورج، أود الاستفسار عن النادي."]))}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t([
              "Contact FORGE on WhatsApp",
              "تواصل مع فورج عبر واتساب",
            ])}
          >
            <MessageCircle size={24} />
          </a>
        </div>
        <div className="footer-links">
          {nav.map((n) => (
            <Link key={n.path} to={n.path}>
              {t(n.name)}
            </Link>
          ))}
        </div>
        <div className="footer-bottom">
          <p>{t(disclaimer)}</p>
          <span>
            © {new Date().getFullYear()} FORGE
            <br />
            {t(["PORTFOLIO CONCEPT", "فكرة لعرض الأعمال"])}
          </span>
        </div>
      </div>
    </footer>
  );
}
class ErrorBoundary extends React.Component {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div
        style={{
          padding: 40,
          color: "#f4f4f0",
          background: "#101211",
          minHeight: "100vh",
        }}
      >
        <h1>FORGE</h1>
        <p>
          Something went wrong. Please reload. / حدث خطأ. يرجى إعادة التحميل.
        </p>
        <button onClick={() => window.location.reload()}>
          Reload / إعادة التحميل
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
