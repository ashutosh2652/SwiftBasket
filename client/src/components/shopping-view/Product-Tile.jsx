import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { motion } from "framer-motion";

function ShoppingProductTile({
  product,
  handleProductDetails,
  handleAddToCart,
}) {
  // console.log(product?._id, product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="bg-gray-900 border-gray-800 overflow-hidden shadow-xl group">
        <div
          onClick={() => handleProductDetails(product?._id)}
          className="cursor-pointer"
        >
          <div className="relative">
            <motion.img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[250px] object-cover"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            {product.totalstock <= 0 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-lg">
                Out Of Stock
              </Badge>
            ) : product.totalstock < 10 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-lg">
                Only {product.totalstock} items left
              </Badge>
            ) : product.salesPrice > 0 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-lg">
                Sale
              </Badge>
            ) : null}
          </div>

          <CardContent className="p-5">
            <motion.h2
              className="text-xl font-bold mb-2 text-white"
              whileHover={{ color: "#a78bfa" }}
            >
              {product?.title}
            </motion.h2>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium bg-gray-800 px-2 py-1 rounded-full">
                {product?.category}
              </span>
              <span className="text-gray-400 text-sm font-medium">
                {product?.brand}
              </span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <span
                  className={`${
                    product?.salesPrice > 0
                      ? "line-through text-gray-500"
                      : "text-purple-400"
                  } font-semibold text-lg`}
                >
                  ${product?.price}
                </span>
                {product?.salesPrice > 0 && (
                  <motion.span
                    className="text-purple-400 font-bold text-xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ${product?.salesPrice}
                  </motion.span>
                )}
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs text-gray-400">
                  ⭐ {product?.rating?.rate || "4.5"}
                </span>
              </motion.div>
            </div>
          </CardContent>
        </div>

        <CardFooter className="p-5 pt-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            {product.totalstock <= 0 ? (
              <Button
                disabled
                className="w-full cursor-not-allowed bg-red-500 text-white font-bold py-2 rounded-lg shadow-lg transition-all duration-300"
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 rounded-lg shadow-lg transition-all duration-300"
                onClick={() => handleAddToCart(product?._id)}
              >
                Add to Cart
              </Button>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ShoppingProductTile;
