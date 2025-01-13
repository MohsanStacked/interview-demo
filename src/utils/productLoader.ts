interface Params {
  id: string;
}

// This loader fetches product data from the API
export const productLoader = async ({ params }: { params: Params }) => {
  const response = await fetch(
    `http://localhost:3001/api/products/${params.id}`
  );
  const data = await response.json();
  return data;
};
