'use client';

import { useMemo, useState } from 'react';
import { Button, Input, Modal } from './ui';

const steps = [
  {
    id: 'goal',
    title: 'Какая цель покупки?',
    type: 'single',
    options: ['Для жизни', 'Для инвестиций', 'Для семьи с детьми', 'Пока изучаю рынок']
  },
  {
    id: 'budget',
    title: 'Какой ориентир по бюджету?',
    type: 'single',
    options: ['До 4 млн ₽', '4–6 млн ₽', '6–8 млн ₽', 'Более 8 млн ₽']
  },
  {
    id: 'firstPay',
    title: 'Размер первоначального взноса?',
    type: 'single',
    options: ['До 20%', '20–30%', '30%+', 'Пока без взноса']
  },
  {
    id: 'term',
    title: 'Планируемый срок ипотеки?',
    type: 'single',
    options: ['До 10 лет', '10–20 лет', '20–30 лет', 'Нужна консультация']
  },
  {
    id: 'timeline',
    title: 'Когда хотите выйти на сделку?',
    type: 'single',
    options: ['В ближайший месяц', '1–3 месяца', '3–6 месяцев', 'Позже']
  },
  {
    id: 'contacts',
    title: 'Оставьте контакт для связи',
    type: 'contact'
  }
];

export default function QuizModal({ open, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const current = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const canGoNext = useMemo(() => {
    if (current.type === 'contact') {
      return answers.name && answers.phone;
    }

    return Boolean(answers[current.id]);
  }, [answers, current]);

  const onSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const submitQuiz = () => {
    const leadPayload = {
      ...answers,
      source: 'site-quiz',
      createdAt: new Date().toISOString()
    };

    console.log('leadPayload', leadPayload);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setStepIndex(0);
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={resetAndClose}>
      {!submitted ? (
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Квиз-подбор</p>
          <h3 className="mt-2 text-2xl font-semibold">{current.title}</h3>
          <div className="mt-4 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>

          {current.type === 'single' ? (
            <div className="mt-6 grid gap-3">
              {current.options.map((option) => (
                <button
                  key={option}
                  className={`rounded-xl border p-3 text-left text-sm transition ${
                    answers[current.id] === option ? 'border-accent bg-accentSoft' : 'border-slate-300 hover:bg-slate-50'
                  }`}
                  onClick={() => onSelect(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-3">
              <Input
                placeholder="Ваше имя"
                value={answers.name || ''}
                onChange={(e) => setAnswers((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Телефон"
                value={answers.phone || ''}
                onChange={(e) => setAnswers((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="ghost" onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}>
              Назад
            </Button>
            {stepIndex < steps.length - 1 ? (
              <Button onClick={() => setStepIndex((prev) => prev + 1)} disabled={!canGoNext} className={!canGoNext ? 'opacity-50' : ''}>
                Далее
              </Button>
            ) : (
              <Button onClick={submitQuiz} disabled={!canGoNext} className={!canGoNext ? 'opacity-50' : ''}>
                Завершить
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold">Спасибо! Мы свяжемся с вами.</h3>
          <p className="mt-2 text-sm text-muted">Краткий результат квиза:</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {Object.entries(answers).map(([key, value]) => (
              <li key={key}>
                <span className="font-medium text-text">{key}: </span>
                {value}
              </li>
            ))}
          </ul>
          <Button className="mt-6" onClick={resetAndClose}>
            Закрыть
          </Button>
        </div>
      )}
    </Modal>
  );
}
