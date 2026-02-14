'use client';

import { useEffect, useState } from 'react';
import { brand } from '@/data/brand';
import { complexes } from '@/data/complexes';
import { faqItems } from '@/data/faq';
import { reviews } from '@/data/reviews';
import FAQAccordion from './FAQAccordion';
import MascotSlot from './MascotSlot';
import QuizModal from './QuizModal';
import { BackgroundSlot, Badge, Button, Card, Carousel, Container, ImageSlot, Input, Reveal, SectionTitle, Textarea } from './ui';

const navItems = [
  { id: 'about', label: 'О нас' },
  { id: 'how', label: 'Как работаем' },
  { id: 'projects', label: 'ЖК' },
  { id: 'services', label: 'Услуги' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacts', label: 'Контакты' }
];

const services = [
  'Одобрение ипотеки',
  'Подбор ЖК под ваши параметры',
  'Сопровождение сделки до ключевых этапов',
  'Помощь с оценкой и страхованием',
  'Рефинансирование действующего кредита',
  'Стратегическая консультация по покупке'
];

const steps = [
  'Уточняем задачу, бюджет и сроки покупки.',
  'Собираем список программ и подходящих ЖК.',
  'Помогаем подготовить документы для заявки.',
  'Сопровождаем согласование и ключевые этапы сделки.'
];

const trustStats = [
  { label: 'Сценарии покупки', value: 'Новостройки и вторичный рынок' },
  { label: 'Формат работы', value: 'Пошаговое сопровождение' },
  { label: 'Коммуникация', value: 'Телефон и Telegram' }
];

export default function HomePage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '', agree: false });

  useEffect(() => {
    setLeadOpen(true);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.agree) {
      alert('Пожалуйста, заполните имя, телефон и подтвердите согласие.');
      return;
    }
    console.log('contactPayload', form);
    alert('Заявка отправлена. Мы свяжемся с вами.');
    setForm({ name: '', phone: '', message: '', agree: false });
  };

  return (
    <>
      <QuizModal open={leadOpen} onClose={() => setLeadOpen(false)} />

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="text-base font-semibold tracking-tight">
            {brand.name}
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm text-muted transition hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer">
              Telegram
            </Button>
            <Button as="a" href={`tel:${brand.phoneHref}`} variant="secondary">
              Позвонить
            </Button>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer" className="px-3 py-2 text-xs">
              Telegram
            </Button>
            <button
              type="button"
              className="rounded-xl bg-white/85 px-3 py-2 text-xs shadow-soft"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              Меню
            </button>
          </div>
        </Container>

        {mobileMenuOpen ? (
          <Container className="pb-4 lg:hidden">
            <div className="flex flex-col gap-2 rounded-2xl bg-white/80 p-3 shadow-soft">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-sm text-muted" onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </Container>
        ) : null}
      </header>

      <main id="top" className="pb-20">
        <section className="pt-6 sm:pt-8">
          <Container>
            <BackgroundSlot backgroundKey="hero-bg" className="px-5 py-10 sm:px-10 sm:py-14">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <Reveal>
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">Ипотечный брокер • Луганск</p>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Подбор жилья и ипотеки в премиальном формате
                  </h1>
                  <p className="mt-4 max-w-xl text-muted">
                    Помогаем подобрать ЖК, сравнить ипотечные программы и пройти сделку спокойно, с понятным маршрутом на каждом этапе.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button onClick={() => setLeadOpen(true)}>Подобрать варианты</Button>
                    <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer" variant="secondary">
                      Написать в Telegram
                    </Button>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 text-sm text-muted">
                    <a href={`tel:${brand.phoneHref}`} className="rounded-2xl bg-white/70 px-3 py-2 shadow-soft">
                      {brand.phoneDisplay}
                    </a>
                    <a href={brand.telegramUrl} target="_blank" rel="noreferrer" className="rounded-2xl bg-white/70 px-3 py-2 shadow-soft">
                      Telegram
                    </a>
                  </div>
                </Reveal>

                <Reveal className="relative">
                  <MascotSlot />
                </Reveal>
              </div>

              <div id="about" className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  'Нейтральный подбор вариантов без давления',
                  'Лаконичная коммуникация и понятный процесс',
                  'Аккуратная проверка параметров сделки',
                  'Контакт через Telegram и телефон в один клик'
                ].map((item) => (
                  <Card key={item} className="p-4">
                    <p className="text-sm text-muted">{item}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-white/65 p-5 shadow-soft">
                <p className="text-lg font-medium">Сопровождаем сделку от выбора ЖК до ключевых этапов оформления.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {trustStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted">{stat.label}</p>
                      <p className="mt-1 text-sm font-medium">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </BackgroundSlot>
          </Container>
        </section>

        <section id="how" className="py-16">
          <Container>
            <SectionTitle eyebrow="Процесс" title="Как работаем" description="Коротко и по шагам: от первичной заявки до выхода на сделку." />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((item, index) => (
                <Reveal key={item}>
                  <Card>
                    <p className="text-xs uppercase tracking-[0.18em] text-accent">Шаг {index + 1}</p>
                    <p className="mt-3 text-sm text-muted">{item}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="projects" className="py-16">
          <Container>
            <SectionTitle eyebrow="ЖК" title="Актуальные жилые комплексы" description="Данные карточек заполняются из массива и легко обновляются." />
            <Carousel>
              {complexes.map((complex) => (
                <Card key={complex.id} className="min-w-[285px] snap-start sm:min-w-[350px]">
                  <ImageSlot slotKey={complex.imageSlotKey} className="h-40 bg-[linear-gradient(130deg,#e8f3ff,#f7faff)]" />
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{complex.name}</h3>
                  <p className="mt-1 text-sm text-muted">{complex.location}</p>
                  <p className="mt-2 text-sm font-medium">{complex.priceFrom}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {complex.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <a href={complex.url} className="mt-4 inline-block text-sm font-medium text-accent hover:opacity-80">
                    Подробнее
                  </a>
                </Card>
              ))}
            </Carousel>
          </Container>
        </section>

        <section id="services" className="py-16">
          <Container>
            <SectionTitle eyebrow="Услуги" title="Формат сопровождения" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Reveal key={service}>
                  <Card>
                    <p className="text-sm font-medium text-text">{service}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="reviews" className="py-16">
          <Container>
            <SectionTitle eyebrow="Отзывы" title="Клиентский опыт" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <Reveal key={review.id}>
                  <Card className="border-0">
                    <div className="mb-3 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-100 to-teal-50">
                      <ImageSlot slotKey={review.avatarSlotKey} hiddenVisual className="h-12 w-12 rounded-full" />
                    </div>
                    <p className="text-amber-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                    <p className="mt-2 text-sm text-muted">{review.text}</p>
                    <p className="mt-3 text-sm font-semibold">{review.name}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="faq" className="py-16">
          <Container>
            <SectionTitle eyebrow="FAQ" title="Частые вопросы" />
            <FAQAccordion items={faqItems} />
          </Container>
        </section>

        <section id="contacts" className="py-16">
          <Container>
            <SectionTitle eyebrow="Контакты" title="Связаться с нами" description="Оставьте короткую заявку или выберите удобный канал связи." />
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <form className="grid gap-3" onSubmit={onSubmit}>
                  <Input
                    placeholder="Имя"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  />
                  <Input
                    placeholder="Телефон"
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                  <Textarea
                    rows={4}
                    placeholder="Сообщение"
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  />
                  <label className="flex items-start gap-2 text-sm text-muted">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={form.agree}
                      onChange={(event) => setForm((prev) => ({ ...prev, agree: event.target.checked }))}
                    />
                    Согласен(на) на обработку контактных данных для обратной связи.
                  </label>
                  <div>
                    <Button type="submit">Отправить заявку</Button>
                  </div>
                </form>
              </Card>

              <Card className="bg-[linear-gradient(150deg,#ffffff,#f0f6ff)]">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Быстрая связь</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">Связаться в Telegram</h3>
                <p className="mt-2 text-sm text-muted">Отправьте сообщение — уточним параметры и предложим релевантные варианты.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer">
                    Открыть Telegram
                  </Button>
                  <Button as="a" href={`tel:${brand.phoneHref}`} variant="secondary">
                    Позвонить
                  </Button>
                </div>
                <div className="mt-4 text-sm text-muted">
                  <p>{brand.phoneDisplay}</p>
                  <p>{brand.ipLabel}</p>
                  <p>{brand.ipInn}</p>
                </div>
              </Card>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <Container className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {brand.name}. {brand.ipLabel}. {brand.ipInn}.
          </p>
          <div className="flex gap-3">
            <a href={brand.telegramUrl} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={`tel:${brand.phoneHref}`}>{brand.phoneDisplay}</a>
          </div>
        </Container>
      </footer>

      <div className="fixed bottom-3 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-md gap-2 rounded-2xl bg-white/90 p-2 shadow-soft backdrop-blur">
          <Button className="flex-1" onClick={() => setLeadOpen(true)}>
            Подобрать варианты
          </Button>
          <Button as="a" href={`tel:${brand.phoneHref}`} variant="secondary" className="flex-1">
            Позвонить
          </Button>
        </div>
      </div>
    </>
  );
}
