import { filterOptions } from "../../config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { motion, scale } from "framer-motion";
import { useSelector } from "react-redux";
function ProductFilter({ selectedFilters, setSelectedFilters }) {
  const handleCheckBoxChange = (category, value) => {
    setSelectedFilters((prev) => {
      let newFilter = { ...prev };
      if (newFilter[category].includes(value)) {
        newFilter[category] = newFilter[category].filter((v) => v !== value);
      } else {
        newFilter[category] = [...newFilter[category], value];
      }
      sessionStorage.setItem("filter", JSON.stringify(newFilter));
      return newFilter;
    });
  };
  const clearAllFilter = () => {
    let initialState = {};
    Object.keys(filterOptions).map((filterItems) => {
      initialState[filterItems] = [];
    });
    setSelectedFilters(initialState);
  };
  const { productList } = useSelector((state) => state.ShoppingSlice);
  return (
    <div className="rounded-lg bg-black shadow-2xl border border-gray-800  max-w-md ">
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-black to-gray-900 rounded-t-2xl">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyitem) => (
          <div key={keyitem}>
            <div className="text-base font-bold">
              <h3 className="p-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {keyitem}
              </h3>
              <div className="grid gap-3 mb-4">
                {filterOptions[keyitem].map((option) => (
                  <Label
                    key={option.label}
                    className="flex items-center gap-2 font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    <Checkbox
                      checked={selectedFilters?.[keyitem]?.includes(option.id)}
                      onCheckedChange={() =>
                        handleCheckBoxChange(keyitem, option.id)
                      }
                      className="border-gray-600 hover:border-purple-400 dark:data-[state=checked]:border-purple-500 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500"
                    />
                    <span className="group-hover:text-white">
                      {option.label}
                    </span>
                    {keyitem === "Category" && (
                      <span className="ml-auto text-xs text-gray-400">
                        {
                          productList.filter(
                            (item) => item.category === option.id
                          ).length
                        }
                      </span>
                    )}
                  </Label>
                ))}
              </div>
              <Separator className="bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-800">
        <motion.div whileTap={{ scale: 0.92 }}>
          <Button
            className="w-full py-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
            onClick={clearAllFilter}
          >
            Clear All Filters
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductFilter;
