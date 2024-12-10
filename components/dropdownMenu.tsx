import React from "react";

const DropdownMenu = () => {
  return (
    <div className="relative group">
      {/* Trigger Button */}
      <button className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700">
        Dropdown Menu
      </button>

      {/* Dropdown Content */}
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 transform scale-95">
        {/* Group 1 */}
        <div className="group/item">
          <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">
            Group 1
          </div>
          <div className="pl-4">
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 1-1</div>
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 1-2</div>
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 1-3</div>
          </div>
        </div>

        {/* Group 2 */}
        <div className="group/item">
          <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">
            Group 2
          </div>
          <div className="pl-4">
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 2-1</div>
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 2-2</div>
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 2-3</div>
          </div>
        </div>

        {/* Group 3 */}
        <div className="group/item">
          <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">
            Group 3
          </div>
          <div className="pl-4">
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 3-1</div>
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 3-2</div>
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Subgroup 3-3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
