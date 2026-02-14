'use client';

import { useMemo, useState } from 'react';
import { Button, Input, Modal } from './ui';

const steps = [
  {
    id: 'goal',
    title: 'Что важно в новом жилье?',
    type: 'single',
    options: ['Для жизни семьи', 'Для инвестиций', 'Ближе к центру', 'Нужны варианты для сравнения']
  },
  {
    id: 'budget',
    title: 'Ваш ориентир по бюджету?',
    type: 'single',
    options: ['До 4 млн ₽', '4–6 млн ₽', '6–8 млн ₽', 'От 8 млн ₽']
  },
  {
    id: 'firstPay',
    title: 'Какой первоначальный взнос рассматриваете?',
    type: 'single',
    options: ['До 20%', '20–30%', '30% и выше', 'Пока уточняю']
  },
  {
    id: 'timing',
    title: 'Когда планируете выходить на сделку?',
    type: 'single',
    options: ['В течение месяца', '1–3 месяца', '3–6 месяцев', 'Позже']
  },
  {
    id: 'contacts',
    title: 'Куда отправить подборку вариантов?',
    type: 'contact'
  }
];

export default function QuizModal({ open, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const current = steps[stepIndex];

  const canGoNext = useMemo(() => {
    if (current.type === 'contact') {
      return Boolean(answers.name && answers.phone);
    }
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
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Короткая заявка</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Подобрать варианты</h3>
          <p className="mt-1 text-sm text-muted">Заполните 5 коротких шагов — подготовим подборку ЖК и условий ипотеки.</p>

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
                Отправить
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">Спасибо за заявку</h3>
          <p className="mt-2 text-sm text-muted">Подборка будет подготовлена на основе указанных параметров.</p>
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
