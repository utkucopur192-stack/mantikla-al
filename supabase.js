export function calculateScore(product) {
  const weights = {
    price: 0.35,
    review: 0.30,
    brand: 0.20,
    warranty: 0.15
  }

  // Fiyat/performans: kategori ortalamasına göre
  const avgPrice = product.category_avg_price || product.price
  const priceScore = Math.min((avgPrice / product.price) * 10, 10)

  // Yorum kalitesi: yıldız + yorum sayısı (logaritmik)
  const reviewScore = (product.rating / 5) * 10 *
    Math.min(Math.log10((product.review_count || 1) + 1) / 3, 1)

  // Marka güveni: 1-10 arası elle girilen skor
  const brandScore = product.brand_score || 7

  // Garanti: her yıl 3.3 puan, max 10
  const warrantyScore = Math.min((product.warranty_years || 1) * 3.3, 10)

  const total =
    priceScore * weights.price +
    reviewScore * weights.review +
    brandScore * weights.brand +
    warrantyScore * weights.warranty

  return Math.round(Math.min(total, 10) * 10) / 10
}

export function getScoreColor(score) {
  if (score >= 9) return '#4caf7d'
  if (score >= 7.5) return '#c9a227'
  return '#e05252'
}
