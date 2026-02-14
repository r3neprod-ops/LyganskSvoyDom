'use client';

import { useMemo, useState } from 'react';
import { Button, Input, Modal } from './ui';

const steps = [
  {
    id: 'goal',
    title: 'Что требуется на старте?',
    type: 'single',
    options: ['Подбор квартиры', 'Одобрение ипотеки', 'Подбор ЖК и программы', 'Нужна первичная консультация']
  },
  {
    id: 'housingType',
    title: 'Какой формат жилья интересует?',
    type: 'single',
    options: ['Новостройка', 'Вторичный рынок', 'Оба варианта', 'Пока определяюсь']
  },
  {
    id: 'budget',
    title: 'Какой бюджет или платёж ориентировочно комфортен?',
    type: 'single',
    options: ['До 4 млн ₽', '4–6 млн ₽', '6–8 млн ₽', 'Нужен расчёт']
  },
  {
    id: 'timeline',
    title: 'Когда планируете активную фазу сделки?',
    type: 'single',
    options: ['В ближайший месяц', '1–3 месяца', '3–6 месяцев', 'Позже']
  },
  {
    id: 'location',
    title: 'Какой район или ЖК рассматриваете?',
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Подобрать варианты</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Оставить заявку на подбор</h3>
          <p className="mt-2 text-sm text-muted">Ответьте на несколько коротких вопросов, чтобы мы подготовили подходящие варианты.</p>

          <div className="mt-4 h-1.5 rounded-full bg-slate-200">
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
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    answers[current.id] === option ? 'border-accent bg-accent/10' : 'border-line bg-white hover:-translate-y-0.5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              <Input placeholder="Ваше имя" value={answers.name || ''} onChange={(event) => setAnswers((prev) => ({ ...prev, name: event.target.value }))} />
              <Input placeholder="Телефон" value={answers.phone || ''} onChange={(event) => setAnswers((prev) => ({ ...prev, phone: event.target.value }))} />
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
                Отправить
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">Спасибо, мы свяжемся с вами</h3>
          <p className="mt-2 text-sm text-muted">Краткая сводка вашей заявки:</p>
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
