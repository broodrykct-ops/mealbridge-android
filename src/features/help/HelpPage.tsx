import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import type { Tab } from '../../types/mealbridge';
import { tutorials } from './tutorials';

type Props = { initialTopic: string | null; onNavigate: (tab: Tab) => void; onBack: () => void };

export function HelpPage({ initialTopic, onNavigate, onBack }: Props) {
  const [topicId, setTopicId] = useState(initialTopic);
  const [step, setStep] = useState(0);
  const [openButton, setOpenButton] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const topic = tutorials.find(item => item.id === topicId);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [topicId]);
  const choose = (id: string | null) => { setStep(0); setOpenButton(null); setTopicId(id); };
  return <section className="mx-auto max-w-3xl" aria-label="MealBridge tutorials">
    <div className="mb-5 flex flex-wrap gap-3">
      {topic && <button className="flex min-h-12 items-center gap-2 rounded-xl border bg-white px-4 py-3 font-semibold" onClick={() => choose(null)}><ArrowLeft size={18} aria-hidden="true"/>All tutorials</button>}
      <button className="min-h-12 rounded-xl px-4 py-3 font-semibold text-[#0062A8] underline underline-offset-4" onClick={onBack}>Back to app</button>
    </div>
    <h2 ref={heading} tabIndex={-1} className="text-2xl font-bold outline-none md:text-3xl">{topic ? topic.title : 'How to use MealBridge'}</h2>
    <p className="mt-2 leading-7 text-slate-600">{topic ? topic.summary : 'Pick just the help you need. There is no need to learn everything today.'}</p>
    {!topic ? <>
      <button className="my-6 flex min-h-24 w-full items-center justify-between gap-4 rounded-3xl bg-[#0062A8] p-5 text-left text-white shadow-sm" onClick={() => choose('start')}>
        <span><span className="block text-xl font-bold">Start here</span><span className="mt-1 block leading-6">Three small steps to your first plan.</span></span><ChevronRight aria-hidden="true" className="shrink-0"/>
      </button>
      <h3 className="mb-3 text-lg font-semibold">What would you like help with?</h3>
      <div className="grid gap-3 sm:grid-cols-2">{tutorials.filter(item => item.id !== 'start').map(item => <button key={item.id} className="flex min-h-24 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm focus-visible:ring-2 focus-visible:ring-[#0062A8]" onClick={() => choose(item.id)}>
        <BookOpen size={21} className="shrink-0 text-[#087A70]" aria-hidden="true"/><span><span className="block font-semibold">{item.title}</span><span className="mt-1 block text-sm leading-6 text-slate-600">{item.summary}</span></span>
      </button>)}</div>
    </> : <>
      <div className="my-6 rounded-3xl border border-teal-100 bg-white p-5 shadow-sm md:p-7">
        <div role="status" aria-live="polite" aria-atomic="true">
          <p className="text-sm font-semibold text-[#087A70]">Step {step + 1} of {topic.steps.length}</p>
          <p className="mt-4 min-h-24 text-lg leading-8">{topic.steps[step]}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button className="min-h-12 rounded-xl border px-4 py-3 font-semibold disabled:opacity-40" disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}>Previous step</button>
          {step < topic.steps.length - 1 ? <button className="min-h-12 rounded-xl bg-[#0062A8] px-5 py-3 font-semibold text-white" onClick={() => setStep(value => Math.min(topic.steps.length - 1, value + 1))}>Next step</button> : <button className="min-h-12 rounded-xl bg-[#0062A8] px-5 py-3 font-semibold text-white" onClick={() => onNavigate(topic.screen)}>{topic.screenLabel}</button>}
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold">What do the buttons do?</h3>
      <p className="mb-4 text-sm leading-6 text-slate-600">Tap a button name below to read its explanation. These examples do not change your meals or settings.</p>
      <div className="space-y-2">{topic.buttons.map(([label, explanation], index) => <div key={label} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <h4><button className="flex min-h-14 w-full items-center justify-between gap-3 p-4 text-left font-semibold" aria-expanded={openButton === label} aria-controls={`help-button-${topic.id}-${index}`} onClick={() => setOpenButton(current => current === label ? null : label)}>{label}<ChevronDown size={18} className="shrink-0" aria-hidden="true"/></button></h4>
        <div id={`help-button-${topic.id}-${index}`} hidden={openButton !== label} className="border-t p-4 leading-7 text-slate-600">{explanation}</div>
      </div>)}</div>
      {topic.note && <p className="mt-5 rounded-2xl bg-[#E7F8F3] p-5 leading-7 text-[#0B1D36]">{topic.note}</p>}
      <button className="my-6 min-h-12 rounded-xl border bg-white px-4 py-3 font-semibold text-[#0062A8]" onClick={() => choose(null)}>Choose another tutorial</button>
    </>}
  </section>;
}
