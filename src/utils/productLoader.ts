// This loader fetches product data from the API
export const productLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  );
  const data = await response.json();
  return { product: data };
};
