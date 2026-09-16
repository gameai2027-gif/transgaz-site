"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductId } from "@/config/company";
import type { LegalDoc } from "@/config/legal";

/**
 * Единая точка управления модальными сценариями сайта:
 * — заявка на КП (с предвыбранной продукцией / источником)
 * — юридические документы (политика ПДн, согласие)
 * Такой контекст — студийная практика: любая кнопка сайта открывает
 * правильный сценарий без проброса пропсов через всю страницу.
 */

type LeadIntent = { source: "rfq" | "modal" | "partners"; product?: ProductId };

type UiState = {
  openLead: (intent?: LeadIntent) => void;
  closeLead: () => void;
  leadIntent: LeadIntent | null;
  openLegal: (doc: LegalDoc) => void;
  closeLegal: () => void;
  legalDoc: LegalDoc | null;
};

const UiContext = createContext<UiState | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [leadIntent, setLeadIntent] = useState<LeadIntent | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);

  const openLead = useCallback((intent?: LeadIntent) => {
    setLegalDoc(null);
    setLeadIntent(intent ?? { source: "modal" });
  }, []);
  const closeLead = useCallback(() => setLeadIntent(null), []);
  const openLegal = useCallback((doc: LegalDoc) => {
    setLeadIntent(null);
    setLegalDoc(doc);
  }, []);
  const closeLegal = useCallback(() => setLegalDoc(null), []);

  const value = useMemo(
    () => ({ openLead, closeLead, leadIntent, openLegal, closeLegal, legalDoc }),
    [openLead, closeLead, leadIntent, openLegal, closeLegal, legalDoc]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiState {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi должен вызываться внутри <UiProvider>");
  return ctx;
}
