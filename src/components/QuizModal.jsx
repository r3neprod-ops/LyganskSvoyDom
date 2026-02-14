'use client';

import { useMemo, useState } from 'react';
import { Button, Input, Modal } from './ui';

const steps = [
  {
    id: 'goal',
    title: 'Что нужно в первую очередь?',
    type: 'single',
    options: ['Покупка квартиры', 'Одобрение ипотеки', 'Подбор ЖК', 'Нужна консультация']
  },
  {
    id: 'housingType',
    title: 'Какой тип жилья рассматриваете?',
    type: 'single',
    options: ['Новостройка', 'Вторичный рынок', 'Рассматриваю оба варианта', 'Пока выбираю']
  },
  {
    id: 'budget',
    title: 'Какой бюджет или ежемесячный платёж комфортен?',
    type: 'single',
    options: ['До 4 млн ₽', '4–6 млн ₽', '6–8 млн ₽', 'Нужен расчёт платежа']
  },
  {
    id: 'timeline',
    title: 'Когда планируете выходить на сделку?',
    type: 'single',
    options: ['В ближайший месяц', '1–3 месяца', '3–6 месяцев', 'Позже']
  },
  {
    id: 'location',
    title: 'Какой район или ЖК в приоритете?',
    type: 'single',
    options: ['Центр', 'Северный район', 'Юго-Запад', 'Нужны рекомендации']
  },
  {
    id: 'contacts',
    title: 'Оставьте контакты для обратной связи',
    type: 'contact'
  }
];

export default function QuizModal({ open, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const current = steps[stepIndex];

  const canGoNext = useMemo(() => {
    if (current.type === 'contact') return Boolean(answers.name && answers.phone);
    return Boolean(answers[current.id]);
  }, [answers, current]);

  const progress = ((stepIndex + 1) / steps.length) * 100;

  const submitRequest = () => {
    const leadPayload = {
      ...answers,
      source: 'lead-modal',
      createdAt: new Date().toISOString()
    };
    console.log('leadPayload', leadPayload);
    setSubmitted(true);
  };

  const closeModal = () => {
    setStepIndex(0);
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={closeModal}>
      {!submitted ? (
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Подбор вариантов</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Получить подборку ЖК</h3>
          <p className="mt-1 text-sm text-muted">Заполните короткую заявку. Это займёт около минуты.</p>

          <div className="mt-4 h-1.5 rounded-full bg-slate-200/70">
            <div className="h-1.5 rounded-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <h4 className="mt-6 text-lg font-medium">{current.title}</h4>

          {current.type === 'single' ? (
            <div className="mt-4 grid gap-2.5">
              {current.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: option }))}
                  className={`rounded-2xl px-4 py-3 text-left text-sm transition-all duration-200 ${
                    answers[current.id] === option ? 'bg-accent/10 text-text shadow-soft ring-1 ring-accent/30' : 'bg-white text-text shadow-soft hover:-translate-y-0.5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              <Input
                placeholder="Ваше имя"
                value={answers.name || ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, name: event.target.value }))}
              />
              <Input
                placeholder="Телефон"
                value={answers.phone || ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, phone: event.target.value }))}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}>
              Назад
            </Button>
            {stepIndex < steps.length - 1 ? (
              <Button onClick={() => setStepIndex((prev) => prev + 1)} disabled={!canGoNext} className={!canGoNext ? 'pointer-events-none opacity-50' : ''}>
                Далее
              </Button>
            ) : (
              <Button onClick={submitRequest} disabled={!canGoNext} className={!canGoNext ? 'pointer-events-none opacity-50' : ''}>
                Отправить заявку
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">Спасибо за обращение</h3>
          <p className="mt-2 text-sm text-muted">Мы подготовим подборку и свяжемся с вами.</p>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            {Object.entries(answers).map(([key, value]) => (
              <li key={key}>
                <span className="font-medium text-text">{key}:</span> {value}
              </li>
            ))}
          </ul>
          <Button className="mt-6" onClick={closeModal}>
            Закрыть
          </Button>
        </div>
      )}
    </Modal>
  );
}
