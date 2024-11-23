import mongoose, { mongo } from "mongoose"
import paginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema(
    {
        tittle: String,
        description: String,
        code: {
            type: Number,
            unique: true
        },
        price: Number,
        status: Boolean,
        stock: Number,
        category: String,
        thumbnail: { type: [String] }
    },
    {
        timestamps: true
    }
);

productSchema.plugin(paginate)

export const productsModel = mongoose.model("products", productSchema);