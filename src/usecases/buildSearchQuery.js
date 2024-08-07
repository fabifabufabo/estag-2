

function buildSearchQuery(params) {
  const { name, city, document } = params;

  let search = {};

  if (name) search.name = { $regex: name, $options: "i" };
  if (city) search.city = city;
  if (document) search.document = { $regex: document, $options: "i" };

  return search;
}

export default buildSearchQuery;
