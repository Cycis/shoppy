export const productQuery = () => {
   const query = `
   *[_type == "product"] | order(_createdAt desc){
      _id,
      title,
      price,
      image,
      "desc" : description[0]{
         children[0]{
            _key,
            text
         },
      }
   }
   `

   return query;
}