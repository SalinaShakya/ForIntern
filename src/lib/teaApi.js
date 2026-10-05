const BASE_URL = 'https://theteaapi.site/api/v1';

/**
 * Fetch all teas from the Tea API
 * @returns {Promise<Array>} Array of tea objects
 */
export async function getAllTeas() {
  try {
    const response = await fetch(`${BASE_URL}/teas.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching teas:', error);
    throw error;
  }
}

/**
 * Fetch a single tea by its slug
 * @param {string} slug - The tea's URL-safe slug identifier
 * @returns {Promise<Object>} Tea object // one tea
 */
export async function getTeaBySlug(slug) {
  try {
    const response = await fetch(`${BASE_URL}/teas/${slug}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tea by slug:', error);
    throw error;
  }
}

/**
 * Fetch all tea categories
 * @returns {Promise<Array>} Array of category objects
 */
export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Fetch all tea types
 * @returns {Promise<Array>} Array of tea type objects
 */
export async function getTeaTypes() {
  try {
    const response = await fetch(`${BASE_URL}/tea-types.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tea types:', error);
    throw error;
  }
}

/**
 * Fetch all ingredients
 * @returns {Promise<Array>} Array of ingredient objects
 */
export async function getIngredients() {
  try {
    const response = await fetch(`${BASE_URL}/ingredients.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
}

/**
 * Fetch all health benefits
 * @returns {Promise<Array>} Array of health benefit objects
 */
export async function getHealthBenefits() {
  try {
    const response = await fetch(`${BASE_URL}/health-benefits.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching health benefits:', error);
    throw error;
  }
}

/**
 * Fetch all characteristics
 * @returns {Promise<Array>} Array of characteristic objects
 */
export async function getCharacteristics() {
  try {
    const response = await fetch(`${BASE_URL}/characteristics.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching characteristics:', error);
    throw error;
  }
}

/**
 * Fetch API metadata
 * @returns {Promise<Object>} API metadata object
 */
export async function getMeta() {
  try {
    const response = await fetch(`${BASE_URL}/meta.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
}

/**
 * Generate a reasonable price for a tea based on its type/category.
 * The API doesn't include prices, so we derive them deterministically.
 * @param {Object} tea - A tea object from the API
 * @returns {string} Price string like "Rs. 450"
 */
export function getTeaPrice(tea) {
  const typeSlug = tea.tea_type?.slug || tea.base_type?.slug || ''; //?. optional chaining as in get slug but if tpe_type isnt there then dont crash
  const categorySlug = tea.category?.slug || '';

  const priceMap = {
    'green': 400,
    'black': 450,
    'white': 600,
    'oolong': 550,
    'puerh': 700,
    'yellow': 650,
  };

  const categoryPriceMap = {
    'blend': 420,
    'tisane': 380,
  };

  // Use a small hash of the tea name to add variation (±50)
  const nameHash = tea.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const variation = (nameHash % 5) * 10; // 0, 10, 20, 30, or 40

  const basePrice = priceMap[typeSlug] || categoryPriceMap[categorySlug] || 450;
  return `Rs. ${basePrice + variation}`;
}
