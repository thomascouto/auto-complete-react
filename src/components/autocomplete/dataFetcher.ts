const dataFetcher = async (searchString: string): Promise<JsonResult[]> => {
  const res = await fetch("https://dummyjson.com/products/search?q=" + searchString);
  const { products } = await res.json();

  return products;
};

export default dataFetcher;
