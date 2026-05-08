import { useState } from "react";

const C = {
  bg: '#0f172a', sidebar: '#020617', glass: 'rgba(30,41,59,0.7)',
  text: '#f8fafc', muted: '#94a3b8', micro: '#64748b',
  border: 'rgba(255,255,255,0.05)', borderHover: 'rgba(45,212,191,0.4)',
  teal: '#2dd4bf', blue: '#3b82f6', violet: '#8b5cf6',
  green: '#10b981', greenBg: 'rgba(16,185,129,0.12)', greenBorder: 'rgba(16,185,129,0.3)',
  amber: '#f59e0b', amberBg: 'rgba(245,158,11,0.12)', amberBorder: 'rgba(245,158,11,0.3)',
  red: '#ef4444', redBg: 'rgba(239,68,68,0.1)', redBorder: 'rgba(239,68,68,0.25)',
};

const glass = {
  background: C.glass, backdropFilter: 'blur(12px)',
  borderRadius: '1rem', border: `1px solid ${C.border}`,
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
};

const mono = { fontFamily: "'Consolas','SFMono-Regular','Courier New',monospace" };

const microlabel = {
  fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em',
  textTransform: 'uppercase', color: C.micro,
};

function GradBar({ from, to, children }) {
  return (
    <div style={{
      background: `linear-gradient(to right, ${from}, ${to})`,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text', fontWeight: 700, fontSize: '18px',
      display: 'inline-block'
    }}>{children}</div>
  );
}

function Badge({ color = C.teal, bg = 'rgba(45,212,191,0.1)', children }) {
  return (
    <span style={{
      ...mono, fontSize: '11px', color, background: bg,
      border: `1px solid ${color}30`, borderRadius: '4px',
      padding: '2px 7px',
    }}>{children}</span>
  );
}

function ConfBar({ score, threshold = 80 }) {
  const color = score >= threshold ? C.green : score >= 60 ? C.amber : C.red;
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'visible', position: 'relative' }}>
        <div style={{ height: '100%', width: `${score}%`, background: color, borderRadius: '99px', transition: 'width 0.6s ease' }} />
        {/* threshold tick */}
        <div style={{
          position: 'absolute', top: '-4px', left: `${threshold}%`,
          width: '2px', height: '14px', background: 'rgba(255,255,255,0.3)',
          borderRadius: '1px', transform: 'translateX(-50%)',
        }} />
      </div>
    </div>
  );
}

function Nameplate() {
  return (
    <svg viewBox="0 0 260 150" style={{ width: '100%', borderRadius: '8px', display: 'block' }}>
      <rect width="260" height="150" rx="6" fill="#b0b8c4" />
      <rect x="3" y="3" width="254" height="144" rx="5" fill="#d4dbe4" stroke="#8a96a4" strokeWidth="0.75" />
      <rect x="10" y="8" width="72" height="26" rx="2" fill="#1e293b" />
      <text x="46" y="25" textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="700" fontFamily="system-ui">TYLER</text>
      <text x="10" y="52" fill="#334155" fontSize="7" fontWeight="700" fontFamily="system-ui">REFRIGERATION SYSTEMS</text>
      <line x1="10" y1="57" x2="250" y2="57" stroke="#94a3b8" strokeWidth="0.5" />
      {[
        ['MODEL', 'TLKM-4-SVC'],
        ['SERIAL', 'TYL-2018-9341-B'],
        ['VOLTAGE', '208-240V / 60Hz'],
        ['REFRIGERANT', 'R-404A'],
        ['MFG DATE', '03/2018'],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="10" y={70 + i * 14} fill="#64748b" fontSize="7" fontWeight="600" fontFamily="monospace">{k}:</text>
          <text x="70" y={70 + i * 14} fill="#1e293b" fontSize="8" fontWeight="700" fontFamily="monospace">{v}</text>
        </g>
      ))}
      <text x="10" y="145" fill="#94a3b8" fontSize="6" fontFamily="system-ui">Scan quality: HIGH · Asset matched in Cairn</text>
    </svg>
  );
}

function Sidebar({ active }) {
  const items = [
    { icon: '⬡', label: 'Dashboard' },
    { icon: '📦', label: 'Catalog' },
    { icon: '🌲', label: 'Assets' },
    { icon: '✉', label: 'Inbound', highlight: true },
    { icon: '🔍', label: 'SmartPart' },
    { icon: '📄', label: 'Quotes' },
    { icon: '⚙', label: 'Settings' },
  ];
  return (
    <div style={{
      width: '56px', background: C.sidebar, display: 'flex', flexDirection: 'column',
      alignItems: 'center', paddingTop: '16px', gap: '4px', flexShrink: 0,
      borderRight: `1px solid ${C.border}`,
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px', marginBottom: '16px',
        background: 'linear-gradient(135deg, #2dd4bf, #3b82f6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px', fontWeight: 700, color: C.bg,
      }}>C</div>
      {items.map(({ icon, label, highlight }) => (
        <div key={label} title={label} style={{
          width: '36px', height: '36px', borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px', cursor: 'pointer',
          background: (highlight && active) ? 'rgba(45,212,191,0.15)' : 'transparent',
          border: (highlight && active) ? `1px solid rgba(45,212,191,0.3)` : '1px solid transparent',
          color: (highlight && active) ? C.teal : C.micro,
        }}>{icon}</div>
      ))}
    </div>
  );
}

function TopBar({ title, sub, grad = [C.teal, C.blue] }) {
  return (
    <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ ...microlabel, marginBottom: '4px' }}>MuseSys · Inbound Intelligence</div>
      <GradBar from={grad[0]} to={grad[1]}>{title}</GradBar>
      {sub && <div style={{ color: C.muted, fontSize: '13px', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

// ─── SCREEN 1: Inbound ───────────────────────────────────────────────────────
function S1({ onNext }) {
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ ...microlabel, marginBottom: '2px' }}>1 UNPROCESSED REQUEST</div>

      <div style={{
        ...glass, padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px',
        border: `1px solid rgba(45,212,191,0.2)`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em',
                background: 'rgba(245,158,11,0.15)', color: C.amber,
                border: `1px solid ${C.amberBorder}`, borderRadius: '4px',
                padding: '2px 8px',
              }}>NEW</span>
              <span style={{ ...mono, fontSize: '11px', color: C.micro }}>REQ-2026-00847</span>
            </div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
              Defrost issue — need part help
            </div>
            <div style={{ color: C.muted, fontSize: '13px' }}>
              From: <span style={{ color: C.teal }}>Wegmans Store 126</span> · Jamie Kowalski · 4 min ago
            </div>
          </div>
          <div style={{ ...microlabel, color: C.micro }}>
            1 attachment
          </div>
        </div>

        <div style={{
          background: 'rgba(15,23,42,0.6)', borderRadius: '8px',
          padding: '12px', display: 'flex', gap: '14px', alignItems: 'flex-start',
        }}>
          <div style={{ width: '130px', flexShrink: 0 }}>
            <Nameplate />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
            <div style={{ ...microlabel }}>Customer message</div>
            <div style={{ color: C.muted, fontSize: '13px', lineHeight: '1.6' }}>
              "Hi — one of our reach-in units at Store 126 stopped defrosting overnight. Attaching the nameplate. We need the defrost heater ASAP. Can you get us a quote?"
            </div>
          </div>
        </div>

        <button onClick={onNext} style={{
          background: 'linear-gradient(to right, #2dd4bf, #3b82f6)',
          border: 'none', borderRadius: '8px', padding: '10px 20px',
          color: C.bg, fontWeight: 700, fontSize: '13px', cursor: 'pointer',
          alignSelf: 'flex-end', letterSpacing: '0.02em',
        }}>
          Analyze with Cairn →
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 2: Extraction ────────────────────────────────────────────────────
function S2({ onNext }) {
  const fields = [
    { label: 'Manufacturer', value: 'Tyler Refrigeration', conf: 96, match: 'Catalog match confirmed' },
    { label: 'Model Number', value: 'TLKM-4-SVC', conf: 92, match: '667k parts searched' },
    { label: 'Serial Number', value: 'TYL-2018-9341-B', ...mono, conf: 89, match: 'Asset ID: WGM-126-RF-0847' },
    { label: 'Request Type', value: 'Defrost heater replacement', conf: 87, match: 'NLP classification' },
  ];
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ ...microlabel }}>Nameplate extracted · 4 fields resolved</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '14px', alignItems: 'start' }}>
        <div style={{ ...glass, padding: '14px' }}>
          <div style={{ ...microlabel, marginBottom: '10px' }}>Source Image</div>
          <Nameplate />
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: C.green, fontSize: '11px' }}>●</span>
            <span style={{ color: C.muted, fontSize: '11px' }}>Scan quality: High</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {fields.map(({ label, value, conf, match }) => {
            const color = conf >= 85 ? C.green : conf >= 70 ? C.amber : C.red;
            return (
              <div key={label} style={{
                ...glass, padding: '12px 14px',
                border: `1px solid ${color}25`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={microlabel}>{label}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color }}>{conf}%</div>
                </div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: '13px', marginBottom: '6px', ...mono }}>
                  {value}
                </div>
                <ConfBar score={conf} />
                <div style={{ fontSize: '10px', color: C.micro, marginTop: '5px' }}>{match}</div>
              </div>
            );
          })}

          <button onClick={onNext} style={{
            background: 'linear-gradient(to right, #2dd4bf, #3b82f6)',
            border: 'none', borderRadius: '8px', padding: '10px 16px',
            color: C.bg, fontWeight: 700, fontSize: '13px', cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>
            SmartPart Assessment →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 3: SmartPart ─────────────────────────────────────────────────────
function S3({ onNext }) {
  const parts = [
    { sku: 'TYL-DEH-240-4K', desc: 'Defrost Heater Element 240V', conf: 94, price: 87.50, status: 'MATCH' },
    { sku: 'TYL-DEH-208-4K', desc: 'Defrost Heater Element 208V', conf: 71, price: 84.00, status: 'REVIEW' },
    { sku: 'TYL-DH-HARN-KT', desc: 'Defrost Heater Harness Kit', conf: 52, price: 34.20, status: 'LOW' },
  ];
  const threshold = 80;

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={microlabel}>SmartPart results · Model TLKM-4-SVC · Defrost heater</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ ...microlabel }}>Confidence threshold</div>
          <div style={{
            background: 'rgba(15,23,42,0.6)', borderRadius: '6px', padding: '3px 10px',
            border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', fontWeight: 700, color: C.text
          }}>80%</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {parts.map(({ sku, desc, conf, price, status }) => {
          const isMatch = conf >= threshold;
          const isLow = conf < 60;
          const color = isMatch ? C.green : isLow ? C.red : C.amber;
          const bg = isMatch ? C.greenBg : isLow ? C.redBg : C.amberBg;
          const border = isMatch ? C.greenBorder : isLow ? C.redBorder : C.amberBorder;

          return (
            <div key={sku} style={{
              ...glass, padding: '14px 16px',
              border: `1px solid ${border}`,
              background: `${bg}`,
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '4px' }}>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: '14px' }}>{desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge color={color} bg={`${color}18`}>{sku}</Badge>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color }}>{conf}%</div>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em',
                    color, background: `${color}18`, border: `1px solid ${color}40`,
                    borderRadius: '4px', padding: '2px 6px',
                  }}>
                    {status === 'MATCH' ? '✓ AUTO' : status === 'REVIEW' ? '⚠ REVIEW' : '✗ LOW'}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1 }}><ConfBar score={conf} threshold={threshold} /></div>
                <div style={{ ...mono, fontSize: '13px', color: C.muted, flexShrink: 0 }}>
                  ${price.toFixed(2)}
                </div>
              </div>
              {conf >= threshold && (
                <div style={{ fontSize: '11px', color: C.green }}>
                  ● Exceeds threshold — quote preparation authorized
                </div>
              )}
              {conf < threshold && conf >= 60 && (
                <div style={{ fontSize: '11px', color: C.amber }}>
                  ⚠ Below threshold — technician confirmation required
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button onClick={onNext} style={{
        background: 'linear-gradient(to right, #2dd4bf, #3b82f6)',
        border: 'none', borderRadius: '8px', padding: '10px 20px',
        color: C.bg, fontWeight: 700, fontSize: '13px', cursor: 'pointer',
        alignSelf: 'flex-end', letterSpacing: '0.02em',
      }}>
        Review System Decision →
      </button>
    </div>
  );
}

// ─── SCREEN 4: The Fork ──────────────────────────────────────────────────────
function S4({ onNext }) {
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ ...microlabel }}>System decision · Confidence routing active</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* HIGH CONFIDENCE */}
        <div style={{
          ...glass, padding: '18px',
          border: `1px solid ${C.greenBorder}`,
          background: C.greenBg,
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...microlabel, color: C.green }}>⚡ 94% confidence</div>
            <span style={{
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em',
              color: C.green, background: C.greenBg, border: `1px solid ${C.greenBorder}`,
              borderRadius: '4px', padding: '2px 7px',
            }}>AUTO-PREPARE</span>
          </div>

          <div style={{ color: C.text, fontWeight: 700, fontSize: '14px' }}>
            Defrost Heater Element 240V
          </div>
          <Badge color={C.teal}>{`TYL-DEH-240-4K`}</Badge>

          <div style={{ borderTop: `1px solid ${C.greenBorder}`, paddingTop: '12px' }}>
            <div style={{ ...microlabel, marginBottom: '8px' }}>Wegmans Contract Pricing</div>
            {[
              ['List Price', '$87.50'],
              ['Contract Discount', '−18%'],
              ['Customer Price', '$71.75'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: C.muted, fontSize: '12px' }}>{k}</span>
                <span style={{ ...mono, fontSize: '12px', color: k === 'Customer Price' ? C.teal : C.text, fontWeight: k === 'Customer Price' ? 700 : 400 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '12px', color: C.green, lineHeight: '1.5' }}>
            System is preparing quote automatically. No technician input required.
          </div>
        </div>

        {/* LOW CONFIDENCE */}
        <div style={{
          ...glass, padding: '18px',
          border: `1px solid ${C.amberBorder}`,
          background: C.amberBg,
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...microlabel, color: C.amber }}>⚠ 71% confidence</div>
            <span style={{
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em',
              color: C.amber, background: C.amberBg, border: `1px solid ${C.amberBorder}`,
              borderRadius: '4px', padding: '2px 7px',
            }}>REVIEW REQ.</span>
          </div>

          <div style={{ color: C.text, fontWeight: 700, fontSize: '14px' }}>
            Defrost Heater Element 208V
          </div>
          <Badge color={C.amber} bg="rgba(245,158,11,0.1)">{`TYL-DEH-208-4K`}</Badge>

          <div style={{ borderTop: `1px solid ${C.amberBorder}`, paddingTop: '12px' }}>
            <div style={{ ...microlabel, color: C.amber, marginBottom: '8px' }}>Technician Input Required</div>
            <div style={{ color: C.muted, fontSize: '12px', marginBottom: '10px', lineHeight: '1.5' }}>
              Both 208V and 240V variants match this model. Which voltage is installed at Store 126?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['208V (confirmed)', '240V (use other match)', 'Unsure — escalate'].map(opt => (
                <div key={opt} style={{
                  background: 'rgba(15,23,42,0.5)', border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: '6px', padding: '8px 12px',
                  color: C.muted, fontSize: '12px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: `1px solid ${C.micro}`, flexShrink: 0 }} />
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={onNext} style={{
        background: 'linear-gradient(to right, #2dd4bf, #3b82f6)',
        border: 'none', borderRadius: '8px', padding: '10px 20px',
        color: C.bg, fontWeight: 700, fontSize: '13px', cursor: 'pointer',
        alignSelf: 'flex-end', letterSpacing: '0.02em',
      }}>
        View Prepared Quote →
      </button>
    </div>
  );
}

// ─── SCREEN 5: Quote ─────────────────────────────────────────────────────────
function S5() {
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={microlabel}>Quote prepared automatically · Awaiting confirmation</div>
        <Badge color={C.teal}>QT-2026-00847</Badge>
      </div>

      <div style={{ ...glass, padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[
            ['Customer', 'Wegmans Store 126', C.teal],
            ['Contact', 'Jamie Kowalski', C.text],
            ['Prepared', 'Auto · 0 min ago', C.green],
          ].map(([k, v, c]) => (
            <div key={k}>
              <div style={microlabel}>{k}</div>
              <div style={{ color: c, fontWeight: 600, fontSize: '13px', marginTop: '4px' }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '14px' }}>
          <div style={{ ...microlabel, marginBottom: '10px' }}>Line Items</div>
          <div style={{
            background: 'rgba(15,23,42,0.5)', borderRadius: '8px', overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 2fr 80px 80px 90px',
              padding: '8px 12px', borderBottom: `1px solid ${C.border}`,
            }}>
              {['SKU', 'Description', 'Qty', 'Unit', 'Total'].map(h => (
                <div key={h} style={{ ...microlabel }}>{h}</div>
              ))}
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 2fr 80px 80px 90px',
              padding: '10px 12px', alignItems: 'center',
            }}>
              <Badge color={C.teal}>TYL-DEH-240-4K</Badge>
              <div style={{ color: C.text, fontSize: '12px' }}>Defrost Heater Element 240V</div>
              <div style={{ ...mono, fontSize: '12px', color: C.muted }}>1</div>
              <div style={{ ...mono, fontSize: '12px', color: C.muted }}>$71.75</div>
              <div style={{ ...mono, fontSize: '13px', color: C.teal, fontWeight: 700 }}>$71.75</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '24px' }}>
            {[
              ['Subtotal', '$71.75'],
              ['Shipping', '$0.00'],
              ['Total', '$71.75'],
            ].map(([k, v]) => (
              <div key={k} style={{ textAlign: 'right' }}>
                <div style={microlabel}>{k}</div>
                <div style={{ ...mono, fontSize: k === 'Total' ? '16px' : '13px', fontWeight: 700, color: k === 'Total' ? C.teal : C.text, marginTop: '2px' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ flex: 1, fontSize: '12px', color: C.muted, lineHeight: '1.5' }}>
            <span style={{ color: C.green, fontWeight: 600 }}>●</span> Pricing applied from Wegmans contract rules · 18% off list · Accurate as of today
          </div>
          <button style={{
            background: 'rgba(15,23,42,0.6)', border: `1px solid ${C.border}`,
            borderRadius: '8px', padding: '9px 16px',
            color: C.muted, fontSize: '12px', fontWeight: 600, cursor: 'pointer',
          }}>
            Review Parts
          </button>
          <button style={{
            background: 'linear-gradient(to right, #2dd4bf, #3b82f6)',
            border: 'none', borderRadius: '8px', padding: '10px 20px',
            color: C.bg, fontWeight: 700, fontSize: '13px', cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>
            Confirm & Send Quote ✓
          </button>
        </div>
      </div>

      <div style={{ ...glass, padding: '12px 16px', background: C.greenBg, border: `1px solid ${C.greenBorder}` }}>
        <div style={{ fontSize: '12px', color: C.green, lineHeight: '1.6' }}>
          <strong>Total time from customer email to quote ready:</strong> &lt; 60 seconds · Zero manual steps · Pricing applied from live Wegmans contract rules
        </div>
      </div>
    </div>
  );
}

const SCREENS = [
  { key: 's1', title: 'Inbound Request', sub: 'Wegmans Store 126 · REQ-2026-00847' },
  { key: 's2', title: 'Nameplate Intelligence', sub: 'OCR extraction · 4 fields resolved' },
  { key: 's3', title: 'SmartPart Assessment', sub: 'TLKM-4-SVC · Defrost heater variants' },
  { key: 's4', title: 'Confidence Routing', sub: 'System decision · Two paths' },
  { key: 's5', title: 'Quote Ready', sub: 'Auto-prepared · Awaiting confirmation' },
];

export default function App() {
  const [step, setStep] = useState(0);
  const next = () => setStep(s => Math.min(s + 1, SCREENS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const { title, sub } = SCREENS[step];
  const gradients = [
    [C.teal, C.blue], [C.teal, C.blue], [C.blue, C.violet],
    [C.blue, C.violet], [C.teal, C.blue],
  ];

  return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif", color: C.text }}>

      {/* Progress bar */}
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)' }}>
        <div style={{
          height: '100%', background: 'linear-gradient(to right, #2dd4bf, #3b82f6)',
          width: `${((step + 1) / SCREENS.length) * 100}%`, transition: 'width 0.4s ease',
        }} />
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar active={step <= 1} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TopBar title={title} sub={sub} grad={gradients[step]} />

          <div style={{ flex: 1, overflow: 'auto' }}>
            {step === 0 && <S1 onNext={next} />}
            {step === 1 && <S2 onNext={next} />}
            {step === 2 && <S3 onNext={next} />}
            {step === 3 && <S4 onNext={next} />}
            {step === 4 && <S5 />}
          </div>

          {/* Nav strip */}
          <div style={{
            borderTop: `1px solid ${C.border}`, padding: '10px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <button onClick={prev} disabled={step === 0} style={{
              background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '6px',
              padding: '6px 14px', color: step === 0 ? C.micro : C.muted,
              fontSize: '12px', cursor: step === 0 ? 'default' : 'pointer',
            }}>← Back</button>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {SCREENS.map((sc, i) => (
                <div key={sc.key} onClick={() => setStep(i)} style={{
                  width: i === step ? '20px' : '6px', height: '6px',
                  borderRadius: '99px', cursor: 'pointer', transition: 'all 0.3s',
                  background: i === step
                    ? 'linear-gradient(to right, #2dd4bf, #3b82f6)'
                    : i < step ? C.micro : 'rgba(255,255,255,0.1)',
                }} />
              ))}
            </div>

            <button onClick={next} disabled={step === SCREENS.length - 1} style={{
              background: step === SCREENS.length - 1 ? 'transparent' : 'linear-gradient(to right, #2dd4bf22, #3b82f622)',
              border: `1px solid ${step === SCREENS.length - 1 ? C.border : 'rgba(45,212,191,0.3)'}`,
              borderRadius: '6px', padding: '6px 14px',
              color: step === SCREENS.length - 1 ? C.micro : C.teal,
              fontSize: '12px', cursor: step === SCREENS.length - 1 ? 'default' : 'pointer',
            }}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
