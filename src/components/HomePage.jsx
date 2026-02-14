'use client';

import { useEffect, useMemo, useState } from 'react';
import { brand } from '@/data/brand';
import { complexes } from '@/data/complexes';
import { faqItems } from '@/data/faq';
import { reviews } from '@/data/reviews';
import FAQAccordion from './FAQAccordion';
import MascotSlot from './MascotSlot';
import QuizModal from './QuizModal';
import { BackgroundSlot, Badge, Button, Card, Carousel, Container, ImageSlot, Input, Reveal, SectionTitle, Textarea } from './ui';

const navItems = [
  { id: 'directions', label: 'Направления' },
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'steps', label: 'Этапы' },
  { id: 'projects', label: 'ЖК' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' }
];

const directions = [
  { title: 'Новостройки', action: 'Смотреть варианты' },
  { title: 'ЖК-партнёры', action: 'Перейти в каталог' },
  { title: 'Вторичка (если нужно)', action: 'Обсудить подбор' },
  { title: 'Семейная ипотека', action: 'Уточнить условия' },
  { title: 'Господдержка', action: 'Проверить формат' },
  { title: 'Рефинансирование', action: 'Рассчитать сценарий' }
];

const services = [
  { title: 'Одобрение ипотеки', text: 'Сопровождаем сбор данных и подготовку заявки в банки-партнёры.' },
  { title: 'Подбор ЖК', text: 'Формируем shortlist по бюджету, локации и целям покупки.' },
  { title: 'Сопровождение сделки', text: 'Помогаем пройти ключевые этапы без лишней нагрузки.' },
  { title: 'Проверка условий', text: 'Сверяем параметры платежа, сроки и условия по документам.' },
  { title: 'Рефинансирование', text: 'Оцениваем целесообразность и потенциальные сценарии улучшения.' },
  { title: 'Онлайн-консультация', text: 'Быстрый старт в Telegram: уточняем запрос и предлагаем план.' }
];

const steps = [
  'Оставляете заявку и описываете задачу.',
  'Получаете первичную консультацию по сценариям.',
  'Согласовываем список ЖК и программ ипотеки.',
  'Готовим документы и сопровождаем заявку.',
  'Проходим ключевые этапы сделки и фиксацию условий.'
];

const metrics = [
  { value: '7+', label: 'лет в сопровождении сделок' },
  { value: '250+', label: 'покупателей в индивидуальном формате' },
  { value: '40+', label: 'вариантов ЖК и программ в работе' }
];

export default function HomePage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const whatsappUrl = useMemo(() => {
    const phoneDigits = brand.phoneHref.replace(/[^\d]/g, '');
    return `https://wa.me/${phoneDigits}`;
  }, []);

  useEffect(() => {
    setLeadOpen(true);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone) {
      alert('Пожалуйста, заполните имя и телефон.');
      return;
    }
    console.log('leadFormPayload', form);
    alert('Спасибо, мы свяжемся с вами.');
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <>
      <QuizModal open={leadOpen} onClose={() => setLeadOpen(false)} />

      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-3">
          <a href="#top" className="text-base font-semibold tracking-tight">
            {brand.name}
          </a>

          <nav className="hidden items-center gap-4 xl:flex">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm text-muted transition hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a href={brand.telegramUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-white px-2.5 py-2 text-xs shadow-soft">
              TG
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-white px-2.5 py-2 text-xs shadow-soft">
              WA
            </a>
            <Button onClick={() => setLeadOpen(true)} className="px-4">
              Подобрать варианты
            </Button>
            <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer" variant="secondary" className="px-4">
              Telegram
            </Button>
            <Button as="a" href={`tel:${brand.phoneHref}`} variant="secondary" className="px-4">
              Позвонить
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button onClick={() => setLeadOpen(true)} className="px-3 py-2 text-xs">
              Подбор
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-xl bg-white/90 px-3 py-2 text-xs shadow-soft"
            >
              Меню
            </button>
          </div>
        </Container>

        {mobileMenuOpen ? (
          <Container className="pb-4 md:hidden">
            <div className="grid gap-2 rounded-2xl bg-white/90 p-3 shadow-soft">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-sm text-muted" onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer" className="flex-1">
                  Telegram
                </Button>
                <Button as="a" href={`tel:${brand.phoneHref}`} variant="secondary" className="flex-1">
                  Позвонить
                </Button>
              </div>
            </div>
          </Container>
        ) : null}
      </header>

      <main id="top" className="pb-20">
        <section className="pt-6 sm:pt-8">
          <Container>
            <BackgroundSlot backgroundKey="hero-bg" className="px-6 py-10 sm:px-10 sm:py-14">
              <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
                <Reveal>
                  <p className="text-xs uppercase tracking-[0.22em] text-accent">Ипотечный брокер • Луганск</p>
                  <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl sm:leading-[1.05]">
                    Подбор ЖК и ипотечного
                    <br className="hidden sm:block" />
                    решения под вашу цель
                  </h1>
                  <p className="mt-4 max-w-xl text-muted">
                    Подберём варианты, сверим условия по ипотеке и проведём по этапам сделки в спокойном рабочем формате.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    <Button onClick={() => setLeadOpen(true)}>Подобрать варианты</Button>
                    <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer" variant="secondary">
                      Написать в Telegram
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 text-sm">
                    <a href={brand.telegramUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-white/85 px-3 py-2 shadow-soft">
                      Telegram
                    </a>
                    <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-white/85 px-3 py-2 shadow-soft">
                      WhatsApp
                    </a>
                    <a href={`tel:${brand.phoneHref}`} className="rounded-xl bg-white/85 px-3 py-2 shadow-soft">
                      {brand.phoneDisplay}
                    </a>
                  </div>
                </Reveal>

                <Reveal>
                  <MascotSlot />
                </Reveal>
              </div>
            </BackgroundSlot>
          </Container>
        </section>

        <section id="directions" className="py-16">
          <Container>
            <SectionTitle eyebrow="Направления" title="Что подберём" description="Сфокусированные направления, чтобы быстро выбрать нужный сценарий." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {directions.map((item) => (
                <Reveal key={item.title}>
                  <Card>
                    <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <button
                      type="button"
                      onClick={() => setLeadOpen(true)}
                      className="mt-4 text-sm font-medium text-accent transition hover:opacity-75"
                    >
                      {item.action}
                    </button>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-6">
          <Container>
            <BackgroundSlot backgroundKey="online-consult" className="px-6 py-8 sm:px-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">Online</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">Консультация онлайн в Telegram</h3>
                  <p className="mt-2 text-sm text-muted">Быстрый формат для старта: уточняем параметры и формируем первичный план.</p>
                </div>
                <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer">
                  Открыть Telegram
                </Button>
              </div>
            </BackgroundSlot>
          </Container>
        </section>

        <section id="about" className="py-16">
          <Container>
            <SectionTitle eyebrow="О нас" title="Сопровождаем покупку от запроса до ключевых этапов сделки" />
            <Reveal>
              <Card>
                <p className="text-muted">
                  Работаем в формате персонального сопровождения: помогаем собрать требования, подобрать ЖК и программу ипотеки, а затем пройти
                  документальные и организационные этапы без перегруза.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {metrics.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/70 p-4 shadow-soft">
                      <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                      <p className="mt-1 text-sm text-muted">{item.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          </Container>
        </section>

        <section id="services" className="py-16">
          <Container>
            <SectionTitle eyebrow="Чем поможем" title="Услуги" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Reveal key={service.title}>
                  <Card>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted">{service.text}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="steps" className="py-16">
          <Container>
            <SectionTitle eyebrow="Этапы работы" title="Как проходит сопровождение" />
            <div className="grid gap-3">
              {steps.map((step, index) => (
                <Reveal key={step}>
                  <div className="rounded-2xl border border-line bg-white/70 px-5 py-4 shadow-soft">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm text-muted">{step}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="projects" className="py-16">
          <Container>
            <SectionTitle eyebrow="ЖК" title="Актуальные комплексы" description="Карточки заполняются из массива данных и готовы к расширению." />
            <Carousel>
              {complexes.map((complex) => (
                <Card key={complex.id} className="min-w-[290px] snap-start sm:min-w-[360px]">
                  <ImageSlot slotKey={complex.imageSlotKey} className="h-44 bg-[linear-gradient(130deg,#e8f3ff,#f7faff)]" />
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{complex.name}</h3>
                  <p className="mt-1 text-sm text-muted">{complex.location}</p>
                  <p className="mt-2 text-sm font-medium">{complex.priceFrom}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {complex.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <a href={complex.url} className="mt-4 inline-block text-sm font-medium text-accent">
                    Подробнее
                  </a>
                </Card>
              ))}
            </Carousel>
          </Container>
        </section>

        <section id="reviews" className="py-16">
          <Container>
            <SectionTitle eyebrow="Отзывы" title="Отзывы из источников" description="Концептуальная подача: Telegram, Яндекс, WhatsApp, Домклик и другие каналы связи." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <Reveal key={review.id}>
                  <Card>
                    <p className="text-xs uppercase tracking-[0.18em] text-accent">{review.sourceLabel}</p>
                    <p className="mt-3 text-amber-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                    <p className="mt-2 text-sm text-muted">{review.text}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <ImageSlot slotKey={review.avatarSlotKey} hiddenVisual className="h-10 w-10 rounded-full" />
                      <p className="text-sm font-semibold text-text">{review.name}</p>
                    </div>
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
            <SectionTitle eyebrow="Заявка" title="Оставьте заявку на подбор" description="Заполните данные — подберём варианты и вернёмся с первичной подборкой." />
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
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
                    placeholder="Комментарий"
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  />
                  <div>
                    <Button type="submit">Отправить заявку</Button>
                  </div>
                </form>
              </Card>

              <Card className="bg-[linear-gradient(145deg,#ffffff,#eef5ff)]">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">Быстрые контакты</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">{brand.phoneDisplay}</h3>
                <p className="mt-2 text-sm text-muted">Удобнее в мессенджере? Напишите в Telegram или WhatsApp.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer">
                    Telegram
                  </Button>
                  <Button as="a" href={whatsappUrl} target="_blank" rel="noreferrer" variant="secondary">
                    WhatsApp
                  </Button>
                </div>
                <p className="mt-5 text-sm text-muted">{brand.ipLabel}</p>
                <p className="text-sm text-muted">{brand.ipInn}</p>
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
          <div className="flex flex-wrap gap-3">
            <a href={brand.telegramUrl} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
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
