'use client';

import { useEffect, useState } from 'react';
import FAQAccordion from './FAQAccordion';
import MascotSlot from './MascotSlot';
import QuizModal from './QuizModal';
import { Badge, Button, Card, Carousel, Container, ImageSlot, Input, SectionTitle, Textarea } from './ui';
import { complexes } from '@/data/complexes';
import { reviews } from '@/data/reviews';
import { faqItems } from '@/data/faq';

const services = [
  'Одобрение ипотеки',
  'Подбор ЖК под задачи семьи',
  'Сопровождение сделки',
  'Помощь с оценкой и страхованием',
  'Рефинансирование текущего кредита',
  'Персональная консультация по стратегии покупки'
];

const steps = [
  'Короткая консультация и определение бюджета',
  'Подбор программ ипотеки и жилых комплексов',
  'Подготовка документов и подача заявок',
  'Согласование условий и проверка объекта',
  'Сопровождение на ключевых этапах сделки'
];

export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '', agree: false });

  useEffect(() => {
    setQuizOpen(true);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.agree) {
      alert('Пожалуйста, заполните имя, телефон и подтвердите согласие.');
      return;
    }
    alert('Успешно отправлено! Мы свяжемся с вами.');
    setForm({ name: '', phone: '', message: '', agree: false });
  };

  return (
    <>
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />

      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-br from-teal-100 via-white to-cyan-50" />
        <Container className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Ипотечный брокер • Луганск</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Помогаем выбрать ЖК, одобрить ипотеку и спокойно пройти сделку
            </h1>
            <p className="mt-5 max-w-xl text-muted">
              Персональный подход к покупке недвижимости: от стратегии финансирования до сопровождения ключевых шагов оформления.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => setQuizOpen(true)}>Пройти квиз</Button>
              <Button variant="secondary">Получить консультацию</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Работаем с новостройками и вторичным рынком</Badge>
              <Badge>Сравниваем программы банков-партнёров</Badge>
              <Badge>Понятный план действий на каждом шаге</Badge>
              <Badge>Нейтральные рекомендации без давления</Badge>
            </div>
          </div>
          <MascotSlot />
        </Container>
      </section>

      <section id="how" className="py-14">
        <Container>
          <SectionTitle eyebrow="Процесс" title="Как это работает" description="Пошаговый и прозрачный процесс сопровождения заявки и выбора недвижимости." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((item, index) => (
              <Card key={item}>
                <p className="mb-3 text-sm font-semibold text-accent">Шаг {index + 1}</p>
                <p className="text-sm text-muted">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="projects" className="py-14">
        <Container>
          <SectionTitle eyebrow="Жилые комплексы" title="Подбор актуальных ЖК" description="Карточки получают данные из массива, чтобы вы могли легко обновлять список объектов." />
          <Carousel>
            {complexes.map((complex) => (
              <Card key={complex.id} className="min-w-[280px] snap-start sm:min-w-[340px]">
                <ImageSlot label={`IMAGE SLOT • ${complex.imageSlotKey}`} className="h-40" />
                <h3 className="mt-4 text-xl font-semibold">{complex.name}</h3>
                <p className="mt-1 text-sm text-muted">{complex.location}</p>
                <p className="mt-2 font-medium">{complex.priceFrom}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {complex.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <a href={complex.url} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
                  Подробнее
                </a>
              </Card>
            ))}
          </Carousel>
        </Container>
      </section>

      <section id="services" className="py-14">
        <Container>
          <SectionTitle eyebrow="Услуги" title="Комплексная помощь по ипотеке и сделке" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service}>
                <p className="text-sm font-medium">{service}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="reviews" className="py-14">
        <Container>
          <SectionTitle eyebrow="Отзывы" title="Что говорят клиенты" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.id}>
                <ImageSlot label={`AVATAR SLOT • ${review.avatarSlotKey}`} className="h-24 rounded-xl" />
                <p className="mt-3 text-amber-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                <p className="mt-2 text-sm text-muted">{review.text}</p>
                <p className="mt-3 text-sm font-semibold">{review.name}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="py-14">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Ответы на частые вопросы" />
          <FAQAccordion items={faqItems} />
        </Container>
      </section>

      <section id="contacts" className="py-14">
        <Container>
          <SectionTitle eyebrow="Контакты" title="Оставьте заявку на консультацию" description="Без внешних интеграций: сейчас форма валидируется на стороне клиента." />
          <Card>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <Input
                placeholder="Имя"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Телефон"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              />
              <Textarea
                placeholder="Сообщение"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              />
              <label className="flex items-start gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={form.agree}
                  onChange={(e) => setForm((prev) => ({ ...prev, agree: e.target.checked }))}
                />
                Я согласен(на) на обработку контактных данных для обратной связи.
              </label>
              <div>
                <Button type="submit">Отправить</Button>
              </div>
            </form>
          </Card>
        </Container>
      </section>

      <footer className="border-t border-slate-200 py-10">
        <Container className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ипотечный брокер «Свой Дом». Реквизиты и лицензии — заглушка.</p>
          <p>Telegram • VK • WhatsApp (заглушки)</p>
        </Container>
      </footer>

      <div className="fixed bottom-3 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-md gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-premium">
          <Button className="flex-1" onClick={() => setQuizOpen(true)}>
            Пройти квиз
          </Button>
          <a href="tel:+70000000000" className="flex-1">
            <Button variant="secondary" className="w-full">
              Позвонить
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
