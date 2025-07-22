import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct, setproductlist } from "../../store/shop/search-slice";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "../../components/shopping-view/Product-Tile";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { fetchProductDetail } from "../../store/shop/products-slice";
import ProductDetailDialog from "../../components/shopping-view/Product-Details";
function SearchProducts() {
  const [keyword, setkeyword] = useState("");
  const [openDialogBox, setopenDialogBox] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();
  const { SearchedProductList } = useSelector((state) => state.ShopSearch);
  const { cartItems } = useSelector((state) => state.ShoppingCart);
  const { productDetail } = useSelector((state) => state.ShoppingSlice);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let timer = null;
  useEffect(() => {
    clearInterval(timer);
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      timer = setTimeout(() => {
        setsearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(searchProduct(keyword));
      }, 1000);
    } else {
      dispatch(setproductlist());
    }
    () => clearInterval(timer);
  }, [keyword]);
  function handleAddToCart(productId) {
    const currentProductIndexInCart =
      cartItems &&
      cartItems.items &&
      cartItems.items.length > 0 &&
      cartItems.items.findIndex((product) => product.productId === productId);

    if (currentProductIndexInCart >= 0) {
      const currentProductIndex = SearchedProductList.findIndex(
        (product) => product?._id === productId
      );

      const currentProductTotalStock =
        SearchedProductList[currentProductIndex]?.totalstock;

      const currentProductQuantity =
        cartItems?.items[currentProductIndexInCart]?.quantity;
      if (currentProductQuantity + 1 > currentProductTotalStock) {
        toast.error(`Only ${currentProductTotalStock} items can be added`);
        return;
      }
    }
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data.payload.success) {
          dispatch(fetchCartItems(user.id));
          toast.success("Product added to Cart");
        }
      }
    );
  }
  function handleProductDetails(getcurrentproductId) {
    dispatch(fetchProductDetail(getcurrentproductId));
  }

  useEffect(() => {
    if (productDetail !== null) setopenDialogBox(true);
  }, [productDetail]);
  console.log("SearchedProductList", SearchedProductList);

  return (
    <div className="container mx-auto px-4 md:px-8 py-4">
      <div className="w-full flex items-center">
        <Input
          placeholder="Enter to search..."
          className="py-6 placeholder:text-lg "
          value={keyword}
          onChange={(event) => setkeyword(event.target.value)}
        />
      </div>
      {!SearchedProductList.length ? (
        <h1 className="text-5xl font-extrabold mt-5">NO PRODUCTS FOUND!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {SearchedProductList.map((product) => (
          <ShoppingProductTile
            key={product?._id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleProductDetails={handleProductDetails}
          />
        ))}
      </div>
      <ProductDetailDialog
        open={openDialogBox}
        setopen={setopenDialogBox}
        productDetail={productDetail}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}
export default SearchProducts;
