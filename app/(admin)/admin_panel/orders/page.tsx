import ButtonGroups from "@/components/(adminPanel)/button_groups";

function Orders() {
  const orders = [
    {
      user: "سفارش ها",
      totalPrice: "30000t",
      data: "test123",
      details: "بررسی سفارش",
    },
    {
      user: "مدیریت کالا",
      totalPrice: "50000t",
      data: "test123",
      details: "بررسی سفارش",
    },
    {
      user: "مدیریت موجودی و قیمت ها",
      totalPrice: "6000t",
      data: "test123",
      details: "بررسی سفارش",
    },
    { user: "خروج", totalPrice: "700000t", data: "test123", details: "بررسی سفارش" },
  ];

  return (
    <div className="w-2/3 bg-slate-600 h-96  xl:mr-96 mx-auto rounded-3xl relative">
      <ButtonGroups/>
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت سفارش ها
      </span>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  نام کاربر
                </th>
                <th scope="col" className="px-6 py-3">
                  مجموع مبلغ
                </th>
                <th scope="col" className="px-6 py-3">
                  زمان سفارش
                </th>
                <th scope="col" className="px-6 py-3">
                  جزيیات
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((el) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.user}
                  </th>
                  <td className="px-6 py-4">{el.totalPrice}</td>
                  <td className="px-6 py-4">{el.data}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {el.details}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Orders;
