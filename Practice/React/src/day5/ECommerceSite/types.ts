import z from "zod";

export const Product = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    image: z.string().regex(/.(gif|jpg|jpeg|png)$/, "An Image expected").nullish(),
    price: z.number(),
    rating: z.object({
        rate: z.number().min(0).max(5),
        count: z.int({message: "An integer count is required"})
    })
});
export const ProductCart = Product.pick({
    id: true,
    title: true,
    price: true,
    image: true
}).extend({
    quantity: z.int(),
});

export type ProductType = z.infer<typeof Product>;

export const Action = z.discriminatedUnion("type", [
    z.object({type: z.literal("add to cart"), data: Product}),
    z.object({type: z.literal("add product"), data: Product}),
    z.object({type: z.literal("delete product"), id: z.int()}),
    z.object({type: z.literal("fetch products"), data: z.array(Product)})
]);

export const ProductContext = z.object({
    products: z.array(Product),
    cart: z.array(ProductCart)
});