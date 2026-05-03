'use client'
import { useState, useEffect, useRef } from 'react'
import { getScoreColor } from '@/lib/scorer'

const CATS = ['Tümü','Telefon','Kulaklık','Laptop','Fön Makinesi','Robot Süpürge','Kahve Makinesi']

const SAMPLE_PRODUCTS = [
  {
    id: 1, name: 'Xiaomi Redmi Note 13 Pro+', brand: 'Xiaomi', category: 'Telefon',
    price: 12999, rating: 4.7, review_count: 3200, warranty_years: 2, brand_score: 8,
    logic_score: 9.3, platform: 'Trendyol',
    specs: ['Dimensity 7200 Ultra','12GB RAM','200MP Kamera','67W Şarj'],
    pros: ['200MP inanılmaz kamera', '67W hızlı şarj', 'Fiyatının üstünde ekran'],
    cons: ['MIUI reklam sorunu', 'Servis ağı sınırlı'],
    why: '200MP kamera + 12GB RAM bu fiyata? Akıllara durgunluk. Kullanıcıların %91\'i memnun.',
    affiliate_url: 'https://trendyol.com',
    emoji: '📱'
  },
  {
    id: 2, name: 'JBL Tune 770NC', brand: 'JBL', category: 'Kulaklık',
    price: 1299, rating: 4.3, review_count: 1800, warranty_years: 1, brand_score: 8.5,
    logic_score: 8.1, platform: 'Hepsiburada',
    specs: ['ANC','50 Saat Batarya','Bluetooth 5.3','Katlanabilir'],
    pros: ['Fiyatına göre harika batarya', 'Hafif ve rahat tasarım', 'Katlanabilir'],
    cons: ['ANC Sony\'ye kıyasla zayıf', 'Plastik yapı ucuz hissettiriyor'],
    why: 'Bu fiyata bu performans çok iyi. Sony kadar değil ama yarı fiyatına gayet yeterli.',
    affiliate_url: 'https://hepsiburada.com',
    emoji: '🎧'
  },
  {
    id: 3, name: 'Philips BHD356', brand: 'Philips', category: 'Fön Makinesi',
    price: 1750, rating: 4.5, review_count: 920, warranty_years: 2, brand_score: 9,
    logic_score: 8.7, platform: 'Trendyol',
    specs: ['1200W','ThermoProtect','İyonik Teknoloji','6 Ayar'],
    pros: ['Az elektrik harcıyor (1200W)', '2 yıl garanti', 'İyonik teknoloji saçı korur'],
    cons: ['Kablo kısa (1.8m)', 'Difüzör ek alınıyor'],
    why: '1200W ile hem saçını korur hem elektrik faturanı düşürür. 2000₺ altında en mantıklı fön.',
    affiliate_url: 'https://trendyol.com',
    emoji: '💨'
  }
]

export default function Home() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [category, setCategory] = useState('Tümü')
  const [search, setSearch] = useState('')
  const [budget, setBudget] = useState(50000)
  const [minScore, setMinScore] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showNotif, setShowNotif] = useState(true)
  const msgsRef = useRef(null)

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages])

  const filtered = products.filter(p => {
    if (category !== 'Tümü' && p.category !== category) return false
    if (p.price > budget) return false
    if (p.logic_score < minScore) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }).sort((a, b) => b.logic_score - a.logic_score)

  async function sendMsg(text) {
    const val = text || input
    if (!val.trim() || loading) return
    setInput('')
    setShowNotif(false)
    const userMsg = { role: 'user', content: val }
    const newHistory = [...history, userMsg]
    setHistory(newHistory)
    setMessages(m => [...m, { type: 'user', text: val }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory })
      })
      const data = await res.json()
      const reply = data.reply || 'Bir sorun oluştu kanka, tekrar dener misin? 🙏'
      setHistory(h => [...h, { role: 'assistant', content: reply }])
      setMessages(m => [...m, { type: 'bot', text: reply }])
    } catch {
      setMessages(m => [...m, { type: 'bot', text: 'Bağlantı sorunu 😅 Tekrar dene!' }])
    }
    setLoading(false)
  }

  const scoreCol = (s) => getScoreColor(s)

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#fff', paddingBottom: '5rem' }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, background: '#c9a227', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontWeight: 800, color: '#0f0f0f', fontSize: 18 }}>M</div>
          <span style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800 }}>mantıkla<span style={{ color: '#c9a227' }}>AL</span></span>
        </div>
        <h1 style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          Sizin için <span style={{ color: '#c9a227' }}>en mantıklı</span><br />seçimi bulalım.
        </h1>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 20, lineHeight: 1.6 }}>
          Yüzlerce yorum, fiyat ve özelliği analiz ederek<br />ne almanız gerektiğini saniyeler içinde söyler.
        </p>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 14, display: 'flex', alignItems: 'center', padding: '6px 6px 6px 14px', gap: 8, maxWidth: 480, margin: '0 auto 16px' }}>
          <span style={{ color: '#555' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Örn: az elektrik harcayan fön makinesi..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13 }} />
          <button style={{ background: '#c9a227', color: '#0f0f0f', border: 'none', borderRadius: 10, padding: '9px 18px', fontFamily: 'Syne', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Bul</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{ background: category === c ? '#c9a2271a' : '#1a1a1a', border: `1px solid ${category === c ? '#c9a227' : '#2a2a2a'}`, borderRadius: 20, padding: '5px 14px', fontSize: 12, color: category === c ? '#c9a227' : '#777', cursor: 'pointer' }}>{c}</button>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem', maxWidth: 700, margin: '0 auto 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div style={{ width: 3, height: 14, background: '#c9a227', borderRadius: 2 }}></div>
          <span style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700 }}>Filtreler</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, color: '#555', marginBottom: 4, letterSpacing: '0.5px' }}>BÜTÇE</div>
            <div style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#c9a227', marginBottom: 6 }}>₺{budget.toLocaleString('tr-TR')}</div>
            <input type="range" min="1000" max="50000" step="500" value={budget} onChange={e => setBudget(+e.target.value)} style={{ width: '100%', accentColor: '#c9a227' }} />
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, color: '#555', marginBottom: 4, letterSpacing: '0.5px' }}>MİN. MANTIK PUANI</div>
            <div style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#c9a227', marginBottom: 6 }}>{minScore}+</div>
            <input type="range" min="0" max="9" step="0.5" value={minScore} onChange={e => setMinScore(+e.target.value)} style={{ width: '100%', accentColor: '#c9a227' }} />
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#555', padding: '2rem' }}>Bu filtreye uyan ürün bulunamadı 🤔</div>
        )}
        {filtered.map((p, i) => (
          <div key={p.id} style={{ background: '#1a1a1a', border: `1.5px solid ${i === 0 ? '#c9a227' : '#2a2a2a'}`, borderRadius: 16, overflow: 'hidden' }}>
            {i === 0 && (
              <div style={{ background: '#c9a227', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🏆</span>
                <span style={{ fontFamily: 'Syne', fontSize: 11, fontWeight: 800, color: '#0f0f0f', letterSpacing: 1 }}>EN MANTIKLI SEÇİM</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'Syne', fontSize: 13, fontWeight: 800, color: '#0f0f0f' }}>Mantık Puanı: {p.logic_score}/10</span>
              </div>
            )}
            <div style={{ background: '#181818', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <span style={{ fontSize: 44 }}>{p.emoji}</span>
              {i > 0 && <div style={{ position: 'absolute', top: 8, right: 8, background: '#222', color: '#777', fontFamily: 'Syne', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>#{i + 1}</div>}
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 2 }}>{p.brand}</div>
              <div style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 800, color: '#c9a227' }}>₺{p.price.toLocaleString('tr-TR')}</span>
                <div style={{ background: '#c9a2271a', border: '1px solid #c9a22744', borderRadius: 20, padding: '4px 12px' }}>
                  <span style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 800, color: scoreCol(p.logic_score) }}>{p.logic_score}</span>
                  <span style={{ fontSize: 11, color: '#666' }}>/10</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {p.specs.map(s => <span key={s} style={{ background: '#222', border: '1px solid #2a2a2a', borderRadius: 6, padding: '2px 7px', fontSize: 10, color: '#888' }}>{s}</span>)}
              </div>
              <div style={{ background: '#111', borderRadius: 10, padding: '9px 12px', marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#c9a227', fontWeight: 500, marginBottom: 4 }}>✦ Neden Mantıklı?</div>
                <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>{p.why}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <div style={{ background: '#111', borderRadius: 10, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: '#4caf7d', fontWeight: 500, marginBottom: 5 }}>Güçlü Yönler</div>
                  {p.pros.map(x => <div key={x} style={{ fontSize: 11, color: '#666', paddingLeft: 12, position: 'relative', marginBottom: 3 }}><span style={{ position: 'absolute', left: 0, color: '#4caf7d' }}>✓</span>{x}</div>)}
                </div>
                <div style={{ background: '#111', borderRadius: 10, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: '#e05252', fontWeight: 500, marginBottom: 5 }}>Zayıf Yönler</div>
                  {p.cons.map(x => <div key={x} style={{ fontSize: 11, color: '#666', paddingLeft: 12, position: 'relative', marginBottom: 3 }}><span style={{ position: 'absolute', left: 0, color: '#e05252' }}>✗</span>{x}</div>)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #222' }}>
                <span style={{ fontSize: 11, color: '#444' }}>{p.platform}'da satılıyor</span>
                <a href={p.affiliate_url} target="_blank" rel="noopener noreferrer" style={{ background: '#c9a227', color: '#0f0f0f', border: 'none', borderRadius: 10, padding: '8px 16px', fontFamily: 'Syne', fontSize: 12, fontWeight: 800, cursor: 'pointer', textDecoration: 'none' }}>Ürüne Git →</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI CHAT BUBBLE */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
        {chatOpen && (
          <div style={{ position: 'absolute', bottom: 66, right: 0, width: 300, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 18, overflow: 'hidden', boxShadow: '0 8px 40px #00000088', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#c9a227', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, background: '#0f0f0f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
              <div>
                <div style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 800, color: '#0f0f0f' }}>MantıkBot</div>
                <div style={{ fontSize: 10, color: '#7a600a' }}>⬤ Çevrimiçi — Gerçek AI</div>
              </div>
            </div>
            <div ref={msgsRef} style={{ height: 240, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ background: '#252525', color: '#ccc', padding: '9px 11px', borderRadius: '4px 12px 12px 12px', fontSize: 12, lineHeight: 1.6, maxWidth: '88%' }}>
                Selam kanka! 👋 Ben MantıkBot. En mantıklı ürünü bulmana yardım ederim. Ne arıyorsun?
              </div>
              {messages.map((m, i) => (
                <div key={i} style={{
                  background: m.type === 'user' ? '#c9a2271a' : '#252525',
                  border: m.type === 'user' ? '1px solid #c9a22733' : 'none',
                  color: m.type === 'user' ? '#e0c060' : '#ccc',
                  padding: '9px 11px',
                  borderRadius: m.type === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                  fontSize: 12, lineHeight: 1.6,
                  maxWidth: '88%',
                  alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start',
                  whiteSpace: 'pre-wrap'
                }}>{m.text}</div>
              ))}
              {loading && <div style={{ background: '#252525', color: '#666', padding: '9px 11px', borderRadius: '4px 12px 12px 12px', fontSize: 12, fontStyle: 'italic' }}>yazıyor...</div>}
            </div>
            <div style={{ padding: '6px 8px 8px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {[['2000₺ altı fön makinesi','2000₺ altı fön makinesi'],['Az elektrik harcayan ürün','Az elektrik harcayan ürün'],['En iyi bütçe kulaklık','En iyi bütçe kulaklık']].map(([label, val]) => (
                <button key={label} onClick={() => sendMsg(val)} style={{ background: '#222', border: '1px solid #2a2a2a', borderRadius: 20, padding: '4px 9px', fontSize: 10, color: '#888', cursor: 'pointer' }}>{label}</button>
              ))}
            </div>
            <div style={{ padding: '8px 10px', borderTop: '1px solid #222', display: 'flex', gap: 6 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Ürün sor..." disabled={loading} style={{ flex: 1, background: '#111', border: '1px solid #2a2a2a', borderRadius: 10, padding: '8px 11px', color: '#fff', fontSize: 12, outline: 'none' }} />
              <button onClick={() => sendMsg()} disabled={loading} style={{ background: '#c9a227', border: 'none', borderRadius: 10, padding: '8px 13px', color: '#0f0f0f', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}>↑</button>
            </div>
          </div>
        )}
        {showNotif && !chatOpen && <div style={{ position: 'absolute', top: 2, right: 2, width: 12, height: 12, background: '#e05252', borderRadius: '50%', border: '2px solid #0f0f0f' }}></div>}
        <button onClick={() => { setChatOpen(o => !o); setShowNotif(false) }} style={{ width: 54, height: 54, background: '#c9a227', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: 24, boxShadow: '0 4px 24px #c9a22766', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🤖</button>
      </div>
    </div>
  )
}
