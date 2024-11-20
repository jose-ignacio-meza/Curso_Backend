import mongoose , {mongo} from "mongoose"
import  paginate  from "mongoose-paginate-v2"
 
const cartSchema= new mongoose.Schema(
    {
      products: [
        {
          id: { type: String, required: true }, 
          quantity: { type: Number, required: true }, 
        },
      ],
    },
    {
    timestamps: true
    }
)
cartSchema.plugin(paginate)

export const cartModel= mongoose.model("cart", cartSchema)