export interface IProduct {
   _id: string;
   title: string;
   price: number;
   image: {
      _key: string;
      _type: "image";
      asset: {
         _ref: string;
      };
   };
   desc: {
      children: {
         _key: string;
         text: string;
      }
   }

}

export type IProductType = {
   _id: string;
   title: string;
   price: number;
   image: Image;
   desc: {
      children: {
         _key: string;
         text: string;
      }
   }

}

export interface Image {
   _key: string;
   _type: "image";
   asset: {
      _ref: string;
   };
}

export interface IDescription {
   _key: string,
   text: string
}