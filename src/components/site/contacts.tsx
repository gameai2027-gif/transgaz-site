import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ExternalLink } from "lucide-react";
import { company } from "@/config/company";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="contacts-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHead
              id="contacts-title"
              index="09"
              title="Контакты"
              sub="Отдел продаж отвечает в рабочее время; заявки с сайта поступают в общую очередь с звонками."
              tone="dark"
            />

            <div className="mt-10 space-y-px overflow-hidden border border-line-dark bg-line-dark">
              <a
                href={company.phoneHref}
                className="group flex items-center gap-4 bg-panel px-5 py-5 transition-colors hover:bg-panel-2"
              >
                <Phone size={20} className="shrink-0 text-gas" aria-hidden="true" />
                <div>
                  <p className="mono-label text-mist">Отдел продаж</p>
                  <p className="mt-1 text-[17px] font-semibold text-paper transition-colors group-hover:text-gas">
                    {company.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${company.emailSales}`}
                className="group flex items-center gap-4 bg-panel px-5 py-5 transition-colors hover:bg-panel-2"
              >
                <Mail size={20} className="shrink-0 text-gas" aria-hidden="true" />
                <div>
                  <p className="mono-label text-mist">Почта для запросов КП</p>
                  <p className="mt-1 text-[15.5px] font-medium text-paper transition-colors group-hover:text-gas">
                    {company.emailSales}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 bg-panel px-5 py-5">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gas" aria-hidden="true" />
                <div>
                  <p className="mono-label text-mist">Офис</p>
                  <p className="mt-1 max-w-sm text-[15px] leading-relaxed text-paper/90">{company.address}</p>
                  <a
                    href={company.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-label mt-2 inline-flex items-center gap-1.5 text-gas underline-offset-4 hover:underline"
                  >
                    Открыть в Яндекс.Картах
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-panel px-5 py-5">
                <Clock size={20} className="mt-0.5 shrink-0 text-gas" aria-hidden="true" />
                <div>
                  <p className="mono-label text-mist">Режим работы</p>
                  <p className="mt-1 text-[15px] text-paper/90">Пн–Пт, 09:00–18:00</p>
                  <p className="text-[13px] text-mist">Отгрузка — по графику заявок</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contacts"
                className="inline-flex min-h-[46px] items-center gap-2 border border-line-dark px-5 text-[14px] font-medium text-paper/85 transition-colors hover:border-gas hover:text-gas"
              >
                <Send size={16} aria-hidden="true" />
                Telegram
              </a>
              <a
                href="#contacts"
                className="inline-flex min-h-[46px] items-center gap-2 border border-line-dark px-5 text-[14px] font-medium text-paper/85 transition-colors hover:border-gas hover:text-gas"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Схема проезда: стилизованная техно-плашка вместо сторонних виджетов */}
          <Reveal delay={100}>
            <div className="bp-grid relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden border border-line-dark bg-panel p-6 sm:p-8">
              <div>
                <p className="mono-label text-mist">Схема расположения</p>
                <h3 className="display mt-4 text-[22px] uppercase leading-snug text-paper sm:text-[26px]">
                  ул. Трамвайная, 2г
                  <span className="text-gas"> · </span>Уфа
                </h3>
                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mist">
                  Офис и площадка отгрузки — в промзоне на севере Уфы, удобный выезд на трассу М-7
                  и Уфимское шоссе. Заезд по пропуску — предупредите менеджера о визите заранее.
                </p>
              </div>
              <a
                href={company.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[50px] items-center justify-center gap-2 bg-gas px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-gas-hot"
              >
                Построить маршрут
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
