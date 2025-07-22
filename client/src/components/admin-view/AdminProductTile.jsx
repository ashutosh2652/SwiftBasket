import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  deleteProducts,
  fetchAllProducts,
} from "../../store/admin/products-slice";
import { toast } from "sonner";

function AdminProductTile({
  product,
  setFormData,
  setopenCreateProductDialog,
  setcurrenteditedId,
  currenteditedId,
}) {
  const dispatch = useDispatch();
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[250px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="font-bold text-xl mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salesPrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              $ {product?.price}
            </span>
            {product.salesPrice > 0 ? (
              <span className="text-lg font-bold">${product?.salesPrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setopenCreateProductDialog(true);
              setFormData(product);
              setcurrenteditedId(product?._id);
            }}
            className="cursor-pointer"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteProducts(product?._id))
                .then((data) => {
                  if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    toast.success("Product Deleted Successfully");
                  } else {
                    toast.error("Error while deleting Product");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Error while deleting Product");
                });
            }}
            className="cursor-pointer "
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
export { AdminProductTile };
