import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  fetchFilteredProducts,
  fetchProductDetail,
} from "../../store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/Product-Tile";
import { useNavigate } from "react-router-dom";
import ProductDetailDialog from "../../components/shopping-view/Product-Details";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { getfeatureImages } from "../../store/common";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brandWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setcurrentSlide] = useState(0);
  const [openDialogBox, setopenDialogBox] = useState(false);
  const { FeatureImageList } = useSelector((state) => state.FeatureImage);
  const { productList, productDetail } = useSelector(
    (state) => state.ShoppingSlice
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleNavigatetoListingPage(categoryType, category) {
    sessionStorage.removeItem("filter");
    const filteritem = {
      Category: [],
      Brand: [],
    };
    filteritem[category] = [categoryType.id];
    console.log("filteritem", filteritem);

    sessionStorage.setItem("filter", JSON.stringify(filteritem));
    navigate("/shop/list");
  }
  function handleAddToCart(productId) {
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
    const timer = setInterval(() => {
      setcurrentSlide((prev) => (prev + 1) % FeatureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [FeatureImageList]);
  useEffect(() => {
    dispatch(
      fetchFilteredProducts({ selectedFilters: {}, sortBy: "low-to-high" })
    );
    dispatch(getfeatureImages());
  }, [dispatch]);
  useEffect(() => {
    if (productDetail !== null) setopenDialogBox(true);
  }, [productDetail]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[400px] overflow-hidden">
        {FeatureImageList && FeatureImageList.length > 0
          ? FeatureImageList.map((slide, index) => (
              <img
                src={slide.image}
                key={index}
                className={`${
                  index == currentSlide ? "opacity-100" : "opacity-0"
                } object-cover transition-opacity h-full w-full duration-1000 left-0 top-0 absolute`}
              />
            ))
          : null}

        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer text-black absolute top-1/2 left-5 transform -translate-y-2"
          onClick={() =>
            setcurrentSlide(
              (prev) =>
                (prev - 1 + FeatureImageList.length) % FeatureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer text-black absolute top-1/2 right-5 transform -translate-y-2"
          onClick={() =>
            setcurrentSlide((prev) => (prev + 1) % FeatureImageList.length)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-purple-400">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl mb-8 text-center ">
            Shop By Category
          </h2>
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg max-w-[300px] transition-shadow duration-400 hover:shadow-pink-700 border-blue-500 bg-gradient-to-tl from-blue-700 to-purple-700"
                onClick={() =>
                  handleNavigatetoListingPage(categoryItem, "Category")
                }
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <categoryItem.icon className="text-primary h-12 w-12 font-bold mb-3" />
                  <span className="font-bold text-lg">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-purple-400">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl mb-8 text-center ">
            Shop By Brand
          </h2>
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {brandWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg max-w-[300px] transition-shadow duration-400 hover:shadow-pink-700 border-blue-500 bg-gradient-to-tl from-blue-700 to-purple-700"
                onClick={() => handleNavigatetoListingPage(brandItem, "Brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <brandItem.icon className="text-primary h-12 w-12 font-bold mb-3" />
                  <span className="font-bold text-lg">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="h-50 bg-gradient-to-b from-purple-400 to-gray-900" />
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto p-6">
          <h2 className="font-bold text-3xl text-center mb-8">
            Featured Product
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
          {productList && productList.length > 0
            ? productList.map((product) => (
                <ShoppingProductTile
                  product={product}
                  key={product._id}
                  handleAddToCart={handleAddToCart}
                  handleProductDetails={handleProductDetails}
                />
              ))
            : null}
        </div>
      </section>
      <ProductDetailDialog
        open={openDialogBox}
        setopen={setopenDialogBox}
        productDetail={productDetail}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}
export default ShoppingHome;
