import { useMemo, useState } from 'react';
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Lock,
  RotateCcw,
  Trash2,
  Unlock,
  UtensilsCrossed,
} from 'lucide-react';
import { formatMoney, getLocalDateKey, RESTAURANT_TABLES } from '../data/catalog';
import type { Translations } from '../i18n/translations';
import type { Locale, OrderMode, OrderRecord } from '../types';

export interface OccupiedTableInfo {
  tableNumber: string;
  total: number;
  orderCount: number;
  customerName: string;
  openedAt: string;
  orderIds: string[];
}

interface CashierPanelProps {
  locale: Locale;
  orders: OrderRecord[];
  occupiedTables: Record<string, OccupiedTableInfo>;
  t: Translations['cashier'];
  onTogglePaid: (order: OrderRecord) => void;
  onCloseTable: (tableNumber: string) => void;
  onRequestDeleteOrder: (order: OrderRecord) => void;
  onNotify: (text: string, tone?: 'success' | 'info' | 'error') => void;
}

type StatusFilter = 'all' | 'pendente' | 'pago';

export function CashierPanel({
  locale,
  orders,
  occupiedTables,
  t,
  onTogglePaid,
  onCloseTable,
  onRequestDeleteOrder,
  onNotify,
}: CashierPanelProps) {
  const todayKey = getLocalDateKey();
  const [selectedDate, setSelectedDate] = useState<string>(todayKey);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const ordersInPeriod = useMemo(() => {
    if (!selectedDate) return orders;
    return orders.filter((o) => o.dateKey === selectedDate);
  }, [orders, selectedDate]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return ordersInPeriod;
    return ordersInPeriod.filter((o) => o.paymentStatus === statusFilter);
  }, [ordersInPeriod, statusFilter]);

  const stats = useMemo(() => {
    let total = 0;
    let paid = 0;
    let pending = 0;
    const byMode: Record<OrderMode, { count: number; total: number }> = {
      mesa: { count: 0, total: 0 },
      retirada: { count: 0, total: 0 },
      delivery: { count: 0, total: 0 },
    };
    const itemMap = new Map<string, { name: string; qty: number; total: number }>();

    for (const order of ordersInPeriod) {
      total += order.total;
      if (order.paymentStatus === 'pago') {
        paid += order.total;
      } else {
        pending += order.total;
      }

      byMode[order.mode].count += 1;
      byMode[order.mode].total += order.total;

      for (const item of order.items) {
        const key = item.productId || item.name;
        const prev = itemMap.get(key) ?? { name: item.name, qty: 0, total: 0 };
        prev.qty += item.qty;
        prev.total += item.lineTotal;
        itemMap.set(key, prev);
      }
    }

    const topItems = Array.from(itemMap.values())
      .sort((a, b) => b.qty - a.qty || b.total - a.total)
      .slice(0, 5);

    const avgTicket =
      ordersInPeriod.length > 0 ? total / ordersInPeriod.length : 0;

    return {
      total,
      paid,
      pending,
      count: ordersInPeriod.length,
      avgTicket,
      byMode,
      topItems,
    };
  }, [ordersInPeriod]);

  const modeLabel = (mode: OrderMode) => {
    if (mode === 'mesa') return t.modeTable;
    if (mode === 'delivery') return t.modeDelivery;
    return t.modePickup;
  };

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString(locale === 'it' ? 'it-IT' : 'pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const handleCopyClosing = async () => {
    const periodLabel = selectedDate || t.allDatesButton;
    const lines = [
      `*${t.closingReportTitle}*`,
      `${t.dateLabel}: ${periodLabel}`,
      '',
      `${t.kpiOrders}: ${stats.count}`,
      `${t.kpiTotal}: ${formatMoney(stats.total)}`,
      `${t.kpiPaid}: ${formatMoney(stats.paid)}`,
      `${t.kpiPending}: ${formatMoney(stats.pending)}`,
      `${t.avgTicket}: ${formatMoney(stats.avgTicket)}`,
      '',
      `${t.byModeTitle}:`,
      `- ${t.modeTable}: ${stats.byMode.mesa.count} (${formatMoney(stats.byMode.mesa.total)})`,
      `- ${t.modePickup}: ${stats.byMode.retirada.count} (${formatMoney(stats.byMode.retirada.total)})`,
      `- ${t.modeDelivery}: ${stats.byMode.delivery.count} (${formatMoney(stats.byMode.delivery.total)})`,
    ];

    if (stats.topItems.length > 0) {
      lines.push('', `${t.topItemsTitle}:`);
      stats.topItems.forEach((item, idx) => {
        lines.push(`${idx + 1}. ${item.name} — ${item.qty}x (${formatMoney(item.total)})`);
      });
    }

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      onNotify(t.toastClosingCopied, 'success');
    } catch {
      onNotify(t.toastClosingCopied, 'info');
    }
  };

  const handleExportCsv = () => {
    const escapeCsv = (val: string | number) =>
      `"${String(val).replace(/"/g, '""')}"`;

    const headers = [
      'Protocolo',
      'Data',
      'Hora',
      'Modalidade',
      'Mesa',
      'Cliente',
      'Telefone',
      'Itens',
      'Total',
      'Pagamento',
      'Status',
      'Observacoes',
    ];

    const rows = ordersInPeriod.map((o) => [
      o.protocol,
      o.dateKey,
      formatTime(o.createdAt),
      modeLabel(o.mode),
      o.tableNumber,
      o.customerName,
      o.customerPhone,
      o.items.map((i) => `${i.qty}x ${i.name}`).join(' | '),
      o.total.toFixed(2),
      o.paymentMethod.toUpperCase(),
      o.paymentStatus === 'pago' ? t.statusPaid : t.filterPending,
      o.notes,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(';'))
      .join('\n');

    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `menks-caixa-${selectedDate || 'historico'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify(t.toastCsvExported, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Date Filter + Export Actions */}
      <div className="flex flex-col gap-3 rounded-[3px] border border-[#e2dad0] bg-white p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-end gap-2.5">
          <div>
            <label
              htmlFor="cashierDate"
              className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
            >
              <Calendar className="h-3.5 w-3.5 text-[#b66d09]" aria-hidden="true" />
              <span>{t.dateLabel}</span>
            </label>
            <input
              id="cashierDate"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-9 rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-2.5 text-xs font-bold text-[#211d1a]"
            />
          </div>

          <button
            type="button"
            onClick={() => setSelectedDate(todayKey)}
            className={`h-9 rounded-[2px] px-3 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors ${
              selectedDate === todayKey
                ? 'bg-[#211d1a] text-[#f5a623]'
                : 'border border-[#d2c9bc] bg-[#fbf9f5] text-[#453d36] hover:bg-[#efe8dd]'
            }`}
          >
            {t.todayButton}
          </button>

          <button
            type="button"
            onClick={() => setSelectedDate('')}
            className={`h-9 rounded-[2px] px-3 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors ${
              selectedDate === ''
                ? 'bg-[#211d1a] text-[#f5a623]'
                : 'border border-[#d2c9bc] bg-[#fbf9f5] text-[#453d36] hover:bg-[#efe8dd]'
            }`}
          >
            {t.allDatesButton}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyClosing}
            className="inline-flex h-9 items-center gap-1.5 rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#211d1a] transition-colors hover:bg-[#efe8dd]"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.copyClosing}</span>
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={ordersInPeriod.length === 0}
            className={`inline-flex h-9 items-center gap-1.5 rounded-[2px] px-3 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors ${
              ordersInPeriod.length === 0
                ? 'cursor-not-allowed bg-[#c8c1b7] text-white'
                : 'bg-[#211d1a] text-[#f5a623] hover:bg-[#342e29]'
            }`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-[3px] border border-[#e2dad0] bg-white p-4">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#7c7368]">
            {t.kpiTotal}
          </span>
          <strong className="font-display tabular-nums mt-1 block text-2xl leading-none text-[#211d1a]">
            {formatMoney(stats.total)}
          </strong>
        </div>

        <div className="rounded-[3px] border border-[#638b25]/35 bg-[#f4f9ec] p-4">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#456614]">
            {t.kpiPaid}
          </span>
          <strong className="font-display tabular-nums mt-1 block text-2xl leading-none text-[#456614]">
            {formatMoney(stats.paid)}
          </strong>
        </div>

        <div className="rounded-[3px] border border-[#f5a623]/60 bg-[#fdf5e6] p-4">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#8a5506]">
            {t.kpiPending}
          </span>
          <strong className="font-display tabular-nums mt-1 block text-2xl leading-none text-[#a23e1e]">
            {formatMoney(stats.pending)}
          </strong>
        </div>

        <div className="rounded-[3px] border border-[#e2dad0] bg-white p-4">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#7c7368]">
            {t.kpiOrders}
          </span>
          <div className="mt-1 flex items-baseline justify-between gap-2">
            <strong className="font-display tabular-nums text-2xl leading-none text-[#211d1a]">
              {stats.count}
            </strong>
            <span className="tabular-nums text-[11px] font-semibold text-[#6e655b]">
              {t.avgTicket}: {formatMoney(stats.avgTicket)}
            </span>
          </div>
        </div>
      </div>

      {/* Live Tables Occupancy & Release Board */}
      <div className="rounded-[3px] border border-[#e2dad0] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-xl uppercase leading-none text-[#211d1a]">
              {t.tablesBoardTitle}
            </h3>
            <p className="mt-1 text-xs text-[#6e655b]">{t.tablesBoardSubtitle}</p>
          </div>
          <span className="tabular-nums rounded-[2px] bg-[#211d1a] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#f5a623]">
            {Object.keys(occupiedTables).length} {t.tableOccupied}
          </span>
        </div>

        {/* Occupied Tables Highlighted with 1-Click Close & Release */}
        {Object.values(occupiedTables).length > 0 && (
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(occupiedTables).map((tbl) => (
              <div
                key={tbl.tableNumber}
                className="flex flex-col justify-between gap-3 rounded-[3px] border border-[#f5a623] bg-[#fdf5e6] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 rounded-[2px] bg-[#a23e1e] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-white">
                      <Lock className="h-2.5 w-2.5" aria-hidden="true" />
                      <span>
                        {t.tablePrefix} {tbl.tableNumber} · {t.tableOccupied}
                      </span>
                    </span>
                    <strong className="mt-1.5 block truncate text-xs font-bold text-[#211d1a]">
                      {tbl.customerName}
                    </strong>
                  </div>
                  <strong className="font-display tabular-nums shrink-0 text-xl leading-none text-[#a23e1e]">
                    {formatMoney(tbl.total)}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => onCloseTable(tbl.tableNumber)}
                  className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[2px] bg-[#638b25] px-3 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#6f9c2a]"
                >
                  <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.closeTableButton}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quick Overview of All 12 Standard Tables */}
        <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-12">
          {RESTAURANT_TABLES.map((num) => {
            const occupied = Boolean(occupiedTables[num]);
            return (
              <div
                key={num}
                className={`rounded-[2px] border px-1.5 py-1.5 text-center ${
                  occupied
                    ? 'border-[#a23e1e]/40 bg-[#a23e1e]/12 text-[#8f3317]'
                    : 'border-[#d9d2c7] bg-[#f8f5ef] text-[#456614]'
                }`}
              >
                <span className="font-display tabular-nums block text-base leading-none">
                  {num}
                </span>
                <span className="mt-0.5 block text-[9px] font-extrabold uppercase tracking-[0.04em]">
                  {occupied ? t.tableOccupied : t.tableFree}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mode Breakdown + Top Products (Statistics Base) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-[3px] border border-[#e2dad0] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[#b66d09]" aria-hidden="true" />
            <h3 className="font-display text-xl uppercase leading-none text-[#211d1a]">
              {t.byModeTitle}
            </h3>
          </div>
          <div className="space-y-2.5">
            {(['mesa', 'retirada', 'delivery'] as OrderMode[]).map((mode) => {
              const info = stats.byMode[mode];
              const pct = stats.total > 0 ? Math.round((info.total / stats.total) * 100) : 0;
              return (
                <div key={mode} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#211d1a]">
                    <span>
                      {modeLabel(mode)} ({info.count})
                    </span>
                    <span className="tabular-nums">
                      {formatMoney(info.total)} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-[2px] bg-[#ede6db]">
                    <div
                      className={`h-full transition-all ${
                        mode === 'mesa'
                          ? 'bg-[#f5a623]'
                          : mode === 'retirada'
                            ? 'bg-[#638b25]'
                            : 'bg-[#211d1a]'
                      } ${
                        pct === 0
                          ? 'w-0'
                          : pct <= 10
                            ? 'w-1/12'
                            : pct <= 20
                              ? 'w-1/5'
                              : pct <= 25
                                ? 'w-1/4'
                                : pct <= 35
                                  ? 'w-1/3'
                                  : pct <= 45
                                    ? 'w-2/5'
                                    : pct <= 55
                                      ? 'w-1/2'
                                      : pct <= 65
                                        ? 'w-3/5'
                                        : pct <= 75
                                          ? 'w-3/4'
                                          : pct <= 85
                                            ? 'w-4/5'
                                            : pct < 100
                                              ? 'w-11/12'
                                              : 'w-full'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[3px] border border-[#e2dad0] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <UtensilsCrossed className="h-4 w-4 text-[#b66d09]" aria-hidden="true" />
            <h3 className="font-display text-xl uppercase leading-none text-[#211d1a]">
              {t.topItemsTitle}
            </h3>
          </div>
          {stats.topItems.length === 0 ? (
            <p className="py-4 text-xs text-[#6a6258]">{t.noStatsYet}</p>
          ) : (
            <ul className="divide-y divide-[#eee7dd]">
              {stats.topItems.map((item, idx) => (
                <li
                  key={`${item.name}-${idx}`}
                  className="flex items-center justify-between gap-2 py-2 text-xs"
                >
                  <span className="truncate font-bold text-[#211d1a]">
                    {idx + 1}. {item.name}
                  </span>
                  <span className="tabular-nums shrink-0 font-semibold text-[#5e564e]">
                    {item.qty}× · {formatMoney(item.total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Orders & Open Table Tabs List */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: t.filterAll },
              { id: 'pendente', label: t.filterPending },
              { id: 'pago', label: t.filterPaid },
            ] as const
          ).map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setStatusFilter(chip.id)}
              className={`h-8 rounded-[2px] px-3 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors ${
                statusFilter === chip.id
                  ? 'bg-[#211d1a] text-[#f5a623]'
                  : 'border border-[#d2c9bc] bg-white text-[#453d36] hover:bg-[#efe8dd]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="rounded-[3px] border border-[#e2dad0] bg-white p-8 text-center text-sm text-[#6a6258]">
            {t.emptyOrders}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredOrders.map((order) => {
              const isPaid = order.paymentStatus === 'pago';
              const isTable = order.mode === 'mesa';
              return (
                <article
                  key={order.id}
                  className={`rounded-[3px] border bg-white p-4 ${
                    isPaid
                      ? 'border-[#638b25]/35'
                      : isTable
                        ? 'border-[#f5a623]/70'
                        : 'border-[#e2dad0]'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-[2px] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.07em] ${
                            isTable
                              ? 'bg-[#f5a623] text-[#23190e]'
                              : 'bg-[#211d1a] text-[#f8f4ec]'
                          }`}
                        >
                          {isTable
                            ? `${t.tablePrefix} ${order.tableNumber}`
                            : modeLabel(order.mode)}
                        </span>

                        <span className="font-mono text-[11px] font-bold text-[#6a6258]">
                          {order.protocol}
                        </span>

                        <span className="tabular-nums text-[11px] text-[#7c7368]">
                          {order.dateKey} · {formatTime(order.createdAt)}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 rounded-[2px] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.05em] ${
                            isPaid
                              ? 'bg-[#638b25]/15 text-[#456614]'
                              : 'bg-[#a23e1e]/12 text-[#a23e1e]'
                          }`}
                        >
                          {isPaid ? (
                            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          ) : (
                            <Clock className="h-3 w-3" aria-hidden="true" />
                          )}
                          <span>
                            {isPaid
                              ? t.statusPaid
                              : isTable
                                ? t.statusPendingTable
                                : t.statusPendingPix}
                          </span>
                        </span>
                      </div>

                      <div className="text-xs font-bold text-[#211d1a]">
                        {order.customerName}
                        {order.customerPhone ? ` · ${order.customerPhone}` : ''}
                      </div>

                      <div className="text-xs leading-relaxed text-[#5e564e]">
                        {order.items
                          .map((item) => `${item.qty}× ${item.name}`)
                          .join(' · ')}
                      </div>

                      {order.notes && (
                        <p className="text-[11px] italic text-[#7c7368]">
                          “{order.notes}”
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#eee7dd] pt-2.5 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                      <strong className="font-display tabular-nums text-2xl leading-none text-[#211d1a]">
                        {formatMoney(order.total)}
                      </strong>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onTogglePaid(order)}
                          className={`inline-flex h-8 items-center gap-1 rounded-[2px] px-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] transition-colors ${
                            isPaid
                              ? 'border border-[#d2c9bc] bg-[#fbf9f5] text-[#453d36] hover:bg-[#efe8dd]'
                              : 'bg-[#638b25] text-white hover:bg-[#6f9c2a]'
                          }`}
                        >
                          {isPaid ? (
                            <>
                              <RotateCcw className="h-3 w-3" aria-hidden="true" />
                              <span>{t.reopenOrder}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{t.markPaid}</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => onRequestDeleteOrder(order)}
                          aria-label={t.deleteOrderAria(order.protocol)}
                          className="inline-flex h-8 items-center justify-center rounded-[2px] border border-[#a83b2f]/30 px-2 text-[#a83b2f] hover:bg-[#a83b2f]/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
