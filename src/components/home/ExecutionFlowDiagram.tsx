'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  PenLine, Shield, GitBranch, Database, BarChart3,
  MessageSquare, Play, ArrowRight, Zap,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface StepDef {
  id: string;
  label: { ko: string; en: string };
  desc: { ko: string; en: string };
  detail: { ko: string; en: string };
  icon: React.ReactNode;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const STEPS: StepDef[] = [
  {
    id: 'input',
    label: { ko: 'SQL 작성', en: 'Write SQL' },
    desc: { ko: '쿼리 입력', en: 'Query Input' },
    detail: {
      ko: 'CodeMirror 6 편집기에서 SQL을 작성합니다. 구문 하이라이팅, 자동완성, Ctrl+Enter 실행을 지원합니다.',
      en: 'Write SQL in the CodeMirror 6 editor with syntax highlighting, autocomplete, and Ctrl+Enter execution.',
    },
    icon: <PenLine className="w-5 h-5" />,
    color: 'blue',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/40',
    textClass: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'validate',
    label: { ko: '권한 검증', en: 'Validate' },
    desc: { ko: 'SQL 검증', en: 'SQL Check' },
    detail: {
      ko: '레벨별 허용된 SQL 명령어인지 검증합니다. 초보 레벨에서는 SELECT만, 전문가 레벨에서는 거의 모든 명령이 허용됩니다.',
      en: 'Validates if the SQL command is allowed for the current level. Beginner: SELECT only, Expert: almost everything.',
    },
    icon: <Shield className="w-5 h-5" />,
    color: 'amber',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/40',
    textClass: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'route',
    label: { ko: 'DB 라우팅', en: 'DB Routing' },
    desc: { ko: '엔진 선택', en: 'Engine Select' },
    detail: {
      ko: '사용자가 선택한 DB 엔진(PostgreSQL / MySQL)으로 쿼리를 라우팅합니다.',
      en: 'Routes the query to the selected DB engine (PostgreSQL / MySQL).',
    },
    icon: <GitBranch className="w-5 h-5" />,
    color: 'violet',
    bgClass: 'bg-violet-500/10',
    borderClass: 'border-violet-500/40',
    textClass: 'text-violet-600 dark:text-violet-400',
  },
  {
    id: 'execute',
    label: { ko: '쿼리 실행', en: 'Execute' },
    desc: { ko: 'DB 실행', en: 'DB Execute' },
    detail: {
      ko: 'Docker 컨테이너의 실제 데이터베이스에서 쿼리를 실행합니다. 5초 타임아웃이 적용됩니다.',
      en: 'Executes the query on the real database in Docker containers with a 5-second timeout.',
    },
    icon: <Database className="w-5 h-5" />,
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'grade',
    label: { ko: '결과 채점', en: 'Grade' },
    desc: { ko: '정답 비교', en: 'Compare' },
    detail: {
      ko: 'exact(순서 일치), unordered(순서 무관), contains(부분 일치) 모드로 결과를 채점합니다.',
      en: 'Grades results using exact, unordered, or contains comparison modes.',
    },
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'rose',
    bgClass: 'bg-rose-500/10',
    borderClass: 'border-rose-500/40',
    textClass: 'text-rose-600 dark:text-rose-400',
  },
  {
    id: 'feedback',
    label: { ko: '피드백', en: 'Feedback' },
    desc: { ko: '결과 표시', en: 'Show Result' },
    detail: {
      ko: '점수, 정답/오답 여부, 힌트, 해설을 표시합니다. 정답 시 학습 포인트를 설명합니다.',
      en: 'Shows score, correct/incorrect status, hints, and explanations. Explains key learning points on success.',
    },
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'teal',
    bgClass: 'bg-teal-500/10',
    borderClass: 'border-teal-500/40',
    textClass: 'text-teal-600 dark:text-teal-400',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ExecutionFlowDiagram({ locale }: { locale: 'ko' | 'en' }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [packetPos, setPacketPos] = useState<number>(-1);

  const resetState = useCallback(() => {
    setActiveStep(null);
    setIsPlaying(false);
    setPacketPos(-1);
  }, []);

  // Animate packet through steps
  useEffect(() => {
    if (!isPlaying) return;
    let step = 0;
    setPacketPos(0);
    const timer = setInterval(() => {
      step++;
      if (step < STEPS.length) {
        setPacketPos(step);
        setActiveStep(step);
      } else {
        clearInterval(timer);
        setTimeout(resetState, 1500);
      }
    }, 1000);
    setActiveStep(0);
    return () => clearInterval(timer);
  }, [isPlaying, resetState]);

  const handlePlayClick = () => {
    if (isPlaying) return;
    resetState();
    setTimeout(() => setIsPlaying(true), 50);
  };

  const selectedStep = activeStep !== null ? STEPS[activeStep] : null;

  return (
    <div className="not-prose my-10 rounded-2xl border border-border/50 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">
              {locale === 'ko' ? 'SQL 실행 흐름' : 'SQL Execution Flow'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {locale === 'ko'
                ? '쿼리가 실행되는 전체 과정을 확인하세요'
                : 'See the complete query execution process'}
            </p>
          </div>
        </div>
        <button
          onClick={handlePlayClick}
          disabled={isPlaying}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                     bg-primary/10 text-primary hover:bg-primary/20 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          {locale === 'ko' ? '흐름 재생' : 'Play Flow'}
        </button>
      </div>

      {/* Steps Pipeline */}
      <div className="p-6">
        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-center justify-between gap-1">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isPast = packetPos > idx;
            const isDimmed = activeStep !== null && !isActive && !isPast && isPlaying;

            return (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                {/* Step Card */}
                <button
                  onClick={() => {
                    if (isPlaying) return;
                    setActiveStep(isActive ? null : idx);
                  }}
                  className={`
                    relative flex flex-col items-center gap-2 p-3 rounded-xl
                    transition-all duration-500 cursor-pointer w-full
                    border-2
                    ${isActive
                      ? `${step.bgClass} ${step.borderClass} shadow-lg scale-105`
                      : isPast
                        ? `${step.bgClass} border-transparent`
                        : isDimmed
                          ? 'border-transparent opacity-30'
                          : 'border-transparent hover:bg-muted/40'
                    }
                  `}
                >
                  {/* Step Number */}
                  <span className={`
                    absolute -top-2 -left-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full
                    ${isActive || isPast ? step.bgClass + ' ' + step.textClass : 'bg-muted text-muted-foreground'}
                  `}>
                    {idx + 1}
                  </span>

                  {/* Icon */}
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300
                    ${isActive ? step.bgClass + ' ' + step.textClass : 'bg-muted/60 text-muted-foreground'}
                  `}>
                    {step.icon}
                  </div>

                  {/* Label */}
                  <span className={`text-xs font-medium text-center leading-tight ${
                    isActive ? step.textClass : 'text-foreground/70'
                  }`}>
                    {step.label[locale]}
                  </span>
                </button>

                {/* Arrow */}
                {idx < STEPS.length - 1 && (
                  <div className={`flex-shrink-0 transition-all duration-500 ${
                    isPlaying && packetPos === idx
                      ? 'text-primary scale-125'
                      : isPast
                        ? 'text-primary/50'
                        : 'text-muted-foreground/30'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-2">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isPast = packetPos > idx;

            return (
              <div key={step.id}>
                <button
                  onClick={() => {
                    if (isPlaying) return;
                    setActiveStep(isActive ? null : idx);
                  }}
                  className={`
                    flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300
                    border-2
                    ${isActive
                      ? `${step.bgClass} ${step.borderClass}`
                      : isPast
                        ? `${step.bgClass} border-transparent`
                        : 'border-transparent hover:bg-muted/40'
                    }
                  `}
                >
                  <span className={`
                    text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center
                    ${isActive ? step.bgClass + ' ' + step.textClass : 'bg-muted text-muted-foreground'}
                  `}>
                    {idx + 1}
                  </span>
                  <div className={isActive ? step.textClass : 'text-muted-foreground'}>
                    {step.icon}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? step.textClass : ''}`}>
                    {step.label[locale]}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className="flex justify-center py-0.5 text-muted-foreground/30">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
                      <path d="M4 12L0 4h8L4 12z" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedStep && !isPlaying && (
        <div className="mx-6 mb-6 p-4 rounded-xl bg-muted/40 border border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className={selectedStep.textClass}>{selectedStep.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{selectedStep.label[locale]}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${selectedStep.bgClass} ${selectedStep.textClass}`}>
                  {selectedStep.desc[locale]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedStep.detail[locale]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
