import { filterOptions } from "@/config";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFillter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Fillters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, idx) => (
            <div key={idx}>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2 ">
                {filterOptions[keyItem].map((option, idx) => (
                  <label key={idx} className="flex items-center gap-2 font-medium">
                    <Checkbox
                      checked={
                        filters && Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              <Separator />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFillter;
