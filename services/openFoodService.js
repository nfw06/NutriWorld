const axios = require('axios');

async function searchFood(query) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=12`;
  const res = await axios.get(url);
  return res.data.products.map(p => ({
    id: p.id || p.code,
    name: p.product_name || 'Nome non disponibile',
    brand: p.brands || '',
    image: p.image_small_url || '',
    calories: p.nutriments?.['energy-kcal_100g'] || 0,
    proteins: p.nutriments?.proteins_100g || 0,
    carbs: p.nutriments?.carbohydrates_100g || 0,
    fats: p.nutriments?.fat_100g || 0,
    fiber: p.nutriments?.fiber_100g || 0,
    nutriscore: p.nutriscore_grade || 'n/d'
  }));
}

async function getFoodById(id) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${id}.json`;
  const res = await axios.get(url);
  const p = res.data.product;
  if (!p) return null;
  return {
    id: p.id || p.code,
    name: p.product_name || 'Nome non disponibile',
    brand: p.brands || '',
    image: p.image_url || '',
    calories: p.nutriments?.['energy-kcal_100g'] || 0,
    proteins: p.nutriments?.proteins_100g || 0,
    carbs: p.nutriments?.carbohydrates_100g || 0,
    fats: p.nutriments?.fat_100g || 0,
    fiber: p.nutriments?.fiber_100g || 0,
    sugar: p.nutriments?.sugars_100g || 0,
    salt: p.nutriments?.salt_100g || 0,
    nutriscore: p.nutriscore_grade || 'n/d',
    ingredients: p.ingredients_text || 'Non disponibile'
  };
}

module.exports = { searchFood, getFoodById };
