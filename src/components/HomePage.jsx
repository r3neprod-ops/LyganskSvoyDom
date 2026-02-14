'use client';

import { useEffect, useState } from 'react';
import { brand } from '@/data/brand';
import { complexes } from '@/data/complexes';
import { faqItems } from '@/data/faq';
import { reviews } from '@/data/reviews';
import FAQAccordion from './FAQAccordion';
import MascotSlot from './MascotSlot';
import QuizModal from './QuizModal';
import {
  BackgroundSlot,
  Badge,
  Button,
  Card,
  Carousel,
  Container,
  IconButton,
  ImageSlot,
  Input,
  Reveal,
  Section,
  SectionTitle,
  Textarea
} from './ui';

const navItems = [
  { id: 'hero', label: 'Главная' },
  { id: 'directions', label: 'Направления' },
  { id: 'about', label: 'О компании' },
  { id: 'steps', label: 'Этапы' },
  { id: 'projects', label: 'ЖК' },
  { id: 'services', label: 'Услуги' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' }
];

const directions = [
  { title: 'Новостройки', text: 'Подберём актуальные варианты по бюджету и срокам.', action: 'Подробнее', large: true },
  { title: 'ЖК-партнёры', text: 'Соберём shortlist комплексов с понятными параметрами.', action: 'Подробнее', large: true },
  { title: 'Семейная ипотека', text: 'Сверим формат программы и условия для вашей ситуации.', action: 'Подробнее' },
  { title: 'Господдержка', text: 'Подскажем возможные сценарии и критерии отбора.', action: 'Подробнее' },
  { title: 'Рефинансирование', text: 'Оценим уместность перехода на более удобные условия.', action: 'Подробнее' },
  { title: 'Консультация', text: 'Разберём текущую задачу и наметим рабочий план.', action: 'Подробнее' }
];

const services = [
  { title: 'Подбор ипотечной программы', text: 'Сравниваем варианты и поясняем отличия по условиям.' },
  { title: 'Подбор ЖК и квартир', text: 'Формируем выборку под бюджет, локацию и сроки.' },
  { title: 'Сопровождение заявки', text: 'Помогаем подготовить документы и пройти этапы подачи.' },
  { title: 'Поддержка по сделке', text: 'Сопровождаем ключевые шаги от выбора до оформления.' },
  { title: 'Финансовая модель покупки', text: 'Разбираем платёж, взнос и нагрузку на бюджет.' },
  { title: 'Персональная онлайн-связь', text: 'Быстро общаемся через Telegram и телефон.' }
];

const steps = [
  'Фиксируем задачу и параметры покупки.',
  'Подбираем ЖК и ипотечные сценарии.',
  'Сверяем документы и подаём заявку.',
  'Согласовываем условия по объекту и банку.',
  'Сопровождаем сделку до ключевых этапов оформления.'
];

const metrics = [
  { title: 'Быстрый ответ', text: 'Выход на связь в рабочем формате без ожидания.' },
  { title: 'Сопровождение сделки', text: 'Пошаговое сопровождение по ходу процесса.' },
  { title: 'Подбор ЖК', text: 'Выборка вариантов с акцентом на вашу цель.' }
];

const tagStyles = ['bg-cyan-50 text-cyan-900', 'bg-slate-100 text-slate-800', 'bg-emerald-50 text-emerald-800'];

export default function HomePage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  useEffect(() => {
    setLeadOpen(true);
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(''), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.phone) {
      setToastMessage('Заполните имя и телефон.');
      return;
    }

    console.log('contactFormPayload', form);
    setToastMessage('Спасибо, мы свяжемся с вами.');
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <>
      <QuizModal open={leadOpen} onClose={() => setLeadOpen(false)} />

      <header className="sticky top-0 z-50 border-b border-line bg-white/88 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-3">
          <a href="#hero" className="text-base font-semibold tracking-tight">
            {brand.name}
          </a>

          <nav className="hidden items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative text-sm text-muted transition hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <IconButton href={brand.telegramUrl} target="_blank" rel="noreferrer">
              TG
            </IconButton>
            <IconButton href={brand.whatsappUrl} target="_blank" rel="noreferrer">
              WA
            </IconButton>
            <Button className="h-12 px-6" onClick={() => setLeadOpen(true)}>
              Подобрать варианты
            </Button>
            <Button as="a" href={`tel:${brand.phoneHref}`} variant="secondary" className="h-12 px-5">
              Позвонить
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button className="h-10 px-3 text-xs" onClick={() => setLeadOpen(true)}>
              Подбор
            </Button>
            <button type="button" onClick={() => setMobileOpen((prev) => !prev)} className="rounded-xl border border-line bg-white px-3 py-2 text-xs">
              Меню
            </button>
          </div>
        </Container>

        {mobileOpen ? (
          <Container className="pb-3 md:hidden">
            <div className="grid gap-2 rounded-2xl border border-line bg-white p-3">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-sm text-muted" onClick={() => setMobileOpen(false)}>
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

      <main>
        <section id="hero" className="pt-6 sm:pt-8">
          <Container>
            <BackgroundSlot backgroundKey="hero-main" className="px-6 py-10 sm:px-10 sm:py-14">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <Reveal>
                  <Badge>Ипотечный брокер • Луганск</Badge>
                  <h1 className="mt-5 text-4xl font-semibold leading-[1.03] tracking-tight sm:text-6xl">
                    Подберём ЖК и ипотеку
                    <br className="hidden sm:block" />
                    под ваш сценарий покупки
                  </h1>
                  <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
                    Помогаем пройти путь от первичного запроса до ключевых этапов сделки: с понятной структурой, аккуратной коммуникацией и фокусом на вашей задаче.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    <Button className="h-12 px-6" onClick={() => setLeadOpen(true)}>
                      Подобрать варианты
                    </Button>
                    <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer" variant="secondary" className="h-12 px-6">
                      Telegram
                    </Button>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Быстрые контакты</p>
                    <div className="mt-4 divide-y divide-slate-100 rounded-xl border border-line">
                      <a href={brand.telegramUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-slate-50">
                        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" />Telegram</span>
                        <span className="text-muted">↗</span>
                      </a>
                      <a href={brand.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-slate-50">
                        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" />WhatsApp</span>
                        <span className="text-muted">↗</span>
                      </a>
                      <a href={`tel:${brand.phoneHref}`} className="flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-slate-50">
                        <span>{brand.phoneDisplay}</span>
                        <span className="text-muted">→</span>
                      </a>
                    </div>
                  </div>
                  <MascotSlot />
                </Reveal>
              </div>
            </BackgroundSlot>
          </Container>
        </section>

        <Section id="directions" className="pt-12">
          <Container>
            <SectionTitle eyebrow="Направления" title="Что подберём" description="Категории подбора в формате сервисного лендинга." />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {directions.map((item) => (
                <Reveal key={item.title} className={item.large ? 'xl:col-span-2' : ''}>
                  <Card className="group border-slate-200 hover:border-accent/35">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted">{item.text}</p>
                      </div>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-sm transition group-hover:border-accent group-hover:text-accent">
                        ›
                      </span>
                    </div>
                    <button type="button" onClick={() => setLeadOpen(true)} className="mt-4 text-sm font-semibold text-accent">
                      {item.action}
                    </button>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <BackgroundSlot backgroundKey="telegram-cta" className="px-6 py-8 sm:px-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Online</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">Консультация онлайн в Telegram</h3>
                  <p className="mt-2 text-sm text-muted">Уточним параметры и предложим первичную подборку в удобном диалоге.</p>
                </div>
                <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer">
                  Перейти в Telegram
                </Button>
              </div>
            </BackgroundSlot>
          </Container>
        </Section>

        <Section id="about">
          <Container>
            <SectionTitle eyebrow="О компании" title="Системная поддержка при покупке недвижимости" description="Работаем как персональный проводник: от первичного запроса до согласования условий и оформления ключевых этапов сделки." />
            <div className="grid gap-4 md:grid-cols-3">
              {metrics.map((item) => (
                <Reveal key={item.title}>
                  <Card className="h-full">
                    <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.text}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="steps">
          <Container>
            <SectionTitle eyebrow="Этапы" title="Как проходит подбор" />
            <div className="grid gap-3">
              {steps.map((step, index) => (
                <Reveal key={step}>
                  <div className="rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">{index + 1}</span>
                        {index < steps.length - 1 ? <span className="mt-2 h-8 w-px bg-slate-200" /> : null}
                      </div>
                      <p className="pt-1 text-sm text-muted">{step}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="projects">
          <Container>
            <SectionTitle eyebrow="Жилые комплексы" title="Актуальные ЖК" description="Карточки заполняются данными из массива и легко масштабируются." />
            <Carousel>
              {complexes.map((complex) => (
                <Card key={complex.id} className="min-w-[290px] snap-start overflow-hidden p-0 sm:min-w-[360px]">
                  <div className="h-44 bg-gradient-to-br from-slate-100 via-slate-50 to-white">
                    <ImageSlot slotKey={complex.imageSlotKey} className="h-full w-full" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl font-semibold tracking-tight">{complex.name}</h3>
                    <p className="mt-1 text-sm text-muted">{complex.location}</p>
                    <p className="mt-2 text-sm font-medium">{complex.priceFrom}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {complex.tags.map((tag, idx) => (
                        <span key={tag} className={`rounded-full px-3 py-1 text-xs font-medium ${tagStyles[idx % tagStyles.length]}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={complex.url} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Подробнее <span>→</span>
                    </a>
                  </div>
                </Card>
              ))}
            </Carousel>
          </Container>
        </Section>

        <Section id="services">
          <Container>
            <SectionTitle eyebrow="Услуги" title="Чем поможем" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
        </Section>

        <Section id="reviews">
          <Container>
            <SectionTitle eyebrow="Отзывы" title="Отзывы из каналов связи" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {reviews.map((review) => (
                <Reveal key={review.id}>
                  <Card>
                    <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {review.sourceLabel}
                    </p>
                    <p className="mt-3 text-amber-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                    <p className="mt-3 text-base text-text">{review.text}</p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">{review.name}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="faq">
          <Container>
            <SectionTitle eyebrow="FAQ" title="Частые вопросы" />
            <FAQAccordion items={faqItems} />
          </Container>
        </Section>

        <Section id="contacts">
          <Container>
            <SectionTitle eyebrow="Заявка" title="Оставьте заявку на подбор" description="Заполните данные — подберём варианты и свяжемся с вами." />
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <form className="grid gap-3" onSubmit={onSubmit}>
                  <Input placeholder="Имя" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
                  <Input placeholder="Телефон" value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} />
                  <Textarea rows={4} placeholder="Комментарий" value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} />
                  <div>
                    <Button type="submit">Отправить заявку</Button>
                  </div>
                </form>
              </Card>

              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Контакты</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">{brand.phoneDisplay}</h3>
                <p className="mt-2 text-sm text-muted">Выберите удобный канал: Telegram, WhatsApp или телефонный звонок.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button as="a" href={brand.telegramUrl} target="_blank" rel="noreferrer">
                    Telegram
                  </Button>
                  <Button as="a" href={brand.whatsappUrl} target="_blank" rel="noreferrer" variant="secondary">
                    WhatsApp
                  </Button>
                </div>
                <p className="mt-5 text-sm text-muted">{brand.ipLabel}</p>
                <p className="text-sm text-muted">{brand.ipInn}</p>
              </Card>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="border-t border-line py-7">
        <Container className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {brand.name}. {brand.ipLabel}. {brand.ipInn}.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={brand.telegramUrl} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={brand.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={`tel:${brand.phoneHref}`}>{brand.phoneDisplay}</a>
          </div>
        </Container>
      </footer>

      {toastMessage ? (
        <div className="fixed bottom-4 left-1/2 z-[80] -translate-x-1/2 rounded-xl bg-text px-4 py-2 text-sm text-white shadow-lift" role="status">
          {toastMessage}
        </div>
      ) : null}

      <div className="fixed bottom-3 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-md gap-2 rounded-2xl border border-line bg-white p-2 shadow-soft">
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
