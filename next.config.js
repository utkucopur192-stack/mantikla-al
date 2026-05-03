export const metadata = {
  title: 'mantıklaAL — En mantıklı ürünü bul',
  description: 'Fiyata değil mantık puanına göre alışveriş yap. Yüzlerce yorum analiz edilir, en mantıklı seçim saniyeler içinde bulunur.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, background: '#0f0f0f' }}>
        {children}
      </body>
    </html>
  )
}
