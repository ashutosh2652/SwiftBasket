import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import ProductFilter from "../../components/shopping-view/ProductFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ArrowUpDown, Check } from "lucide-react";
import { filterOptions, SortOptions } from "../../config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "../../components/shopping-view/Product-Tile";
import {
  fetchFilteredProducts,
  fetchProductDetail,
} from "../../store/shop/products-slice";
import { useSearchParams } from "react-router-dom";
import ProductDetailDialog from "../../components/shopping-view/Product-Details";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { toast } from "sonner";
function createsearchParamsHelper(filterParams) {
  const QueryParams = [];
  if (filterParams && typeof filterOptions === "object") {
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        QueryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return QueryParams.join("&");
  }
}
function ShoppingListing() {
  const [sortBy, setsortBy] = useState("low-to-high");
  const { productList } = useSelector((state) => state.ShoppingSlice);
  const [searchparams, setsearchparams] = useSearchParams();
  const [openDialogBox, setopenDialogBox] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.ShoppingCart);
  const dispatch = useDispatch();
  const categorysearchparams = searchparams.get("Category");
  const options = () => {
    const initialState = {};
    Object.keys(filterOptions).map((filterItems) => {
      initialState[filterItems] = [];
    });
    return initialState;
  };
  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(sessionStorage.getItem("filter")) || options
  );

  useEffect(() => {
    const createQuerystring = createsearchParamsHelper(selectedFilters);
    setsearchparams(new URLSearchParams(createQuerystring));
  }, [selectedFilters]);
  useEffect(() => {
    dispatch(fetchFilteredProducts({ selectedFilters, sortBy }));
  }, [dispatch, sortBy, selectedFilters]);
  useEffect(() => {
    const filter = sessionStorage.getItem("filter");
    setSelectedFilters(JSON.parse(filter));
  }, [categorysearchparams]);
  function handleProductDetails(getcurrentproductId) {
    dispatch(fetchProductDetail(getcurrentproductId));
  }
  function handleAddToCart(productId) {
    const currentProductIndexInCart =
      cartItems &&
      cartItems.items &&
      cartItems.items.length > 0 &&
      cartItems.items.findIndex((product) => product.productId === productId);
    if (currentProductIndexInCart >= 0) {
      const currentProductIndex = productList.findIndex(
        (product) => product._id === productId
      );
      const currentProductTotalStock =
        productList[currentProductIndex].totalstock;

      const currentProductQuantity =
        cartItems.items[currentProductIndexInCart].quantity;
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
  const { productDetail } = useSelector((state) => state.ShoppingSlice);
  useEffect(() => {
    if (productDetail !== null) setopenDialogBox(true);
  }, [productDetail]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:items-start gap-6 p-4 sm:p-6">
      <ProductFilter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="rounded-lg shadow-sm w-full bg-gradient-to-b from-black/90 via-gray-500/30 to-transparent">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-extrabold text-gray-400 text-lg">All Products</h2>
          <div className="flex items-center justify-center gap-5">
            <span className="text-muted-foreground animate-fadeIn">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer text-black/75 hover:text-black/95 hover:bg-gray-300"
                >
                  <ArrowUpDown className="h-8 w-8" />
                  <span className="font-semibold text-base">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent // for radio use dropdownmenuRadioGroup and dropdownmenuRadioItem
                align="end"
                className="w-56 flex flex-col mt-2"
              >
                {SortOptions.map((options) => (
                  <DropdownMenuItem
                    key={options.id}
                    onClick={() =>
                      setsortBy((prev) =>
                        prev === options.id ? "low-to-high" : options.id
                      )
                    }
                  >
                    <div className="flex items-center gap-2 p-0.5  cursor-pointer hover:bg-gray-500 rounded-md px-2">
                      <span>{options.label}</span>
                      {sortBy === options.id && (
                        <Check className=" border-black/65" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
          {productList &&
            productList.length > 0 &&
            productList.map((products) => (
              <ShoppingProductTile
                product={products}
                key={products?._id}
                handleProductDetails={handleProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))}
        </div>
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
export default ShoppingListing;
