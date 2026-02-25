'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Monitor, Server, Database, Shield, CheckCircle,
  BookOpen, Terminal, Play, RotateCcw, Layers,
  Container, HardDrive, Globe, Zap,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface NodeDef {
  id: string;
  label: { ko: string; en: string };
  desc: { ko: string; en: string };
  tech: string;
  icon: React.ReactNode;
}

interface LayerDef {
  id: string;
  label: { ko: string; en: string };
  color: string;          // tailwind base (e.g. 'blue')
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeClass: string;
  nodes: NodeDef[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const LAYERS: LayerDef[] = [
  {
    id: 'client',
    label: { ko: '클라이언트 레이어', en: 'Client Layer' },
    color: 'blue',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/30',
    textClass: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-500/20 text-blue-600 dark:text-blue-300',
    nodes: [
      {
        id: 'dashboard', icon: <Monitor className="w-5 h-5" />,
        label: { ko: '대시보드', en: 'Dashboard' },
        desc: { ko: '레벨별 학습 현황과 진행도를 한눈에 확인합니다.', en: 'View learning progress and level status at a glance.' },
        tech: 'React 19 + Zustand',
      },
      {
        id: 'workspace', icon: <Terminal className="w-5 h-5" />,
        label: { ko: 'SQL 워크스페이스', en: 'SQL Workspace' },
        desc: { ko: 'CodeMirror 6 기반 SQL 편집기에서 쿼리를 작성하고 실행합니다.', en: 'Write and execute queries in a CodeMirror 6-based SQL editor.' },
        tech: 'CodeMirror 6',
      },
      {
        id: 'docs', icon: <BookOpen className="w-5 h-5" />,
        label: { ko: '이론 문서', en: 'Theory Docs' },
        desc: { ko: '22개 섹션의 체계적인 SQL/DBA 이론을 학습합니다.', en: 'Study structured SQL/DBA theory across 22 sections.' },
        tech: 'react-markdown + SVG',
      },
    ],
  },
  {
    id: 'api',
    label: { ko: 'API 레이어', en: 'API Layer' },
    color: 'violet',
    bgClass: 'bg-violet-500/10',
    borderClass: 'border-violet-500/30',
    textClass: 'text-violet-600 dark:text-violet-400',
    badgeClass: 'bg-violet-500/20 text-violet-600 dark:text-violet-300',
    nodes: [
      {
        id: 'execute', icon: <Zap className="w-5 h-5" />,
        label: { ko: 'execute-sql', en: 'execute-sql' },
        desc: { ko: 'SQL 쿼리를 선택한 DB 엔진에서 실행하는 API 라우트입니다.', en: 'API route that executes SQL queries on the selected DB engine.' },
        tech: 'Next.js Route Handler',
      },
      {
        id: 'reset', icon: <RotateCcw className="w-5 h-5" />,
        label: { ko: 'reset-db', en: 'reset-db' },
        desc: { ko: '데이터베이스를 초기 상태로 복원하는 API입니다.', en: 'API that restores the database to its initial state.' },
        tech: 'Next.js Route Handler',
      },
    ],
  },
  {
    id: 'logic',
    label: { ko: '코어 로직', en: 'Core Logic' },
    color: 'amber',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-600 dark:text-amber-400',
    badgeClass: 'bg-amber-500/20 text-amber-600 dark:text-amber-300',
    nodes: [
      {
        id: 'validator', icon: <Shield className="w-5 h-5" />,
        label: { ko: 'SQL 검증기', en: 'SQL Validator' },
        desc: { ko: '레벨별 SQL 명령어 권한을 검증합니다 (초보: SELECT만 → 전문가: 거의 모든 것).', en: 'Validates SQL command permissions per level (Beginner: SELECT only → Expert: almost everything).' },
        tech: 'Custom Parser',
      },
      {
        id: 'grader', icon: <CheckCircle className="w-5 h-5" />,
        label: { ko: '채점 엔진', en: 'Grading Engine' },
        desc: { ko: 'exact / unordered / contains 모드로 쿼리 결과를 채점합니다.', en: 'Grades query results using exact / unordered / contains modes.' },
        tech: 'Result Comparator',
      },
      {
        id: 'state', icon: <Layers className="w-5 h-5" />,
        label: { ko: '상태 관리', en: 'State Management' },
        desc: { ko: '진행도, DB 엔진, 언어 설정을 localStorage에 영속화합니다.', en: 'Persists progress, DB engine, and locale to localStorage.' },
        tech: 'Zustand 5',
      },
    ],
  },
  {
    id: 'database',
    label: { ko: '데이터베이스 레이어', en: 'Database Layer' },
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    badgeClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300',
    nodes: [
      {
        id: 'postgresql', icon: <Database className="w-5 h-5" />,
        label: { ko: 'PostgreSQL 16', en: 'PostgreSQL 16' },
        desc: { ko: 'Docker 컨테이너에서 실행되는 PostgreSQL 16 인스턴스입니다.', en: 'PostgreSQL 16 instance running in a Docker container.' },
        tech: 'Docker + pg',
      },
      {
        id: 'mysql', icon: <HardDrive className="w-5 h-5" />,
        label: { ko: 'MySQL 8.0', en: 'MySQL 8.0' },
        desc: { ko: 'Docker 컨테이너에서 실행되는 MySQL 8.0 인스턴스입니다.', en: 'MySQL 8.0 instance running in a Docker container.' },
        tech: 'Docker + mysql2',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ArchitectureDiagram({ locale }: { locale: 'ko' | 'en' }) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetState = useCallback(() => {
    setActiveLayer(null);
    setActiveNode(null);
    setIsPlaying(false);
  }, []);

  // Animate flow through layers
  useEffect(() => {
    if (!isPlaying) return;
    let step = 0;
    const timer = setInterval(() => {
      if (step < LAYERS.length) {
        setActiveLayer(step);
        setActiveNode(null);
        step++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          resetState();
        }, 1200);
      }
    }, 1400);
    return () => clearInterval(timer);
  }, [isPlaying, resetState]);

  const handlePlayClick = () => {
    if (isPlaying) return;
    resetState();
    setIsPlaying(true);
  };

  // Find selected node detail
  const selectedNodeData = activeNode
    ? LAYERS.flatMap((l) => l.nodes).find((n) => n.id === activeNode)
    : null;

  return (
    <div className="not-prose my-10 rounded-2xl border border-border/50 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">
              {locale === 'ko' ? '시스템 아키텍처' : 'System Architecture'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {locale === 'ko'
                ? '각 레이어를 클릭하여 상세 정보를 확인하세요'
                : 'Click each layer to see details'}
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

      {/* Layers */}
      <div className="p-6 space-y-3">
        {LAYERS.map((layer, idx) => {
          const isActive = activeLayer === idx;
          const isDimmed = activeLayer !== null && !isActive;

          return (
            <div key={layer.id}>
              {/* Layer Card */}
              <div
                onClick={() => {
                  if (isPlaying) return;
                  setActiveLayer(isActive ? null : idx);
                  setActiveNode(null);
                }}
                className={`
                  relative rounded-xl border-2 p-4 transition-all duration-500 cursor-pointer
                  ${isActive
                    ? `${layer.borderClass} ${layer.bgClass} shadow-lg scale-[1.01]`
                    : isDimmed
                      ? 'border-border/20 bg-muted/10 opacity-40'
                      : `border-border/40 hover:${layer.borderClass} hover:${layer.bgClass}`
                  }
                `}
              >
                {/* Layer Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${layer.badgeClass}`}>
                    {locale === 'ko' ? `L${idx + 1}` : `L${idx + 1}`}
                  </span>
                  <span className={`text-sm font-semibold ${isActive ? layer.textClass : 'text-muted-foreground'}`}>
                    {layer.label[locale]}
                  </span>
                  {layer.id === 'database' && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                      <Container className="w-3.5 h-3.5" /> Docker Compose
                    </span>
                  )}
                </div>

                {/* Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {layer.nodes.map((node) => {
                    const isNodeActive = activeNode === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isPlaying) return;
                          setActiveLayer(idx);
                          setActiveNode(isNodeActive ? null : node.id);
                        }}
                        className={`
                          flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm
                          transition-all duration-300 border
                          ${isNodeActive
                            ? `${layer.bgClass} ${layer.borderClass} ${layer.textClass} font-medium shadow-sm`
                            : 'border-transparent bg-background/60 hover:bg-background/80 text-foreground/80'
                          }
                        `}
                      >
                        <span className={isNodeActive ? layer.textClass : 'text-muted-foreground'}>
                          {node.icon}
                        </span>
                        <span className="truncate">{node.label[locale]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flow Arrow between layers */}
              {idx < LAYERS.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className={`flex flex-col items-center transition-all duration-500 ${
                    isPlaying && activeLayer === idx
                      ? 'text-primary scale-125'
                      : 'text-muted-foreground/40'
                  }`}>
                    <div className={`w-0.5 h-3 rounded-full ${
                      isPlaying && activeLayer === idx ? 'bg-primary animate-pulse' : 'bg-border'
                    }`} />
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                      <path d="M6 8L0 0h12L6 8z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      {selectedNodeData && !isPlaying && (
        <div className="mx-6 mb-6 p-4 rounded-xl bg-muted/40 border border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-primary">{selectedNodeData.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{selectedNodeData.label[locale]}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                  {selectedNodeData.tech}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedNodeData.desc[locale]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
