import { useState } from "react";
import { Transition } from "@headlessui/react";


interface FilterComponentProps {
    subcategoriesArray: Icategory[];
  }

interface Icategory {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({subcategoriesArray}) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const toggleFilter = (filterName: string) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  const filters = [
    { name: "زیردسته بندی", options: subcategoriesArray.map((item) => item.name) },
    { name: "قیمت", options: ["صعودی", "نزولی"] },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      {filters.map((filter, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleFilter(filter.name)}
            className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 focus:outline-none"
          >
            <span>{filter.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${
                openFilter === filter.name ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <Transition
            show={openFilter === filter.name}
            enter="transition-all duration-300 ease-in-out"
            enterFrom="h-0 opacity-0"
            enterTo="h-auto opacity-100"
            leave="transition-all duration-100 ease-in-out"
            leaveFrom="h-auto opacity-100"
            leaveTo="h-0 opacity-0"
          >
            <div className="mt-2 px-4">
              {filter.options.map((option, index) => (
                <div key={index} className="py-1">
                  <label className="flex items-center space-x-2" >
                    <input
                      name="subcategory"
                      type="radio"
                      className="form-radio h-4 w-4 outline-none text-gray-800 border-gray-300 rounded focus:border-transparent focus:ring-0"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </Transition>
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
