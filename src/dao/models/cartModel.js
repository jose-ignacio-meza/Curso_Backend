import mongoose , {mongo} from "mongoose"
import  paginate  from "mongoose-paginate-v2"
 
const cartSchema= new mongoose.Schema(
    {
      products: [
            {
              id: { type: mongoose.Schema.Types.ObjectId , required: true ,ref: "products"}, 
              quantity: { type: Number, required: true }, 
            }
      ],
    },
    {
    timestamps: true
    }
)

cartSchema.plugin(paginate)

export const cartModel= mongoose.model("cart", cartSchema)