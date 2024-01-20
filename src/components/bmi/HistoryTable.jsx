/* eslint-disable react/prop-types */
const HistoryTable = ({ bmiList }) => {
  return (
    <>
      {bmiList.length > 0 ? (
        <div>
          <table className="w-full border-collapse">
            <thead className="text-md text-left font-medium text-gray-900">
              <tr>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  Nama
                </th>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  Umur
                </th>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  TB
                </th>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  BB
                </th>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  IMT
                </th>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  Kategori TB/U
                </th>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  Kategori BB/U
                </th>
                <th className="border-b border-gray-500 md:px-4 px-1">
                  Kategori IMT/U
                </th>
              </tr>
            </thead>
            <tbody>
              {bmiList.map((bmi) => (
                <tr key={bmi.id} className="text-sm text-gray-900">
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.child_name}
                  </td>
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.age_text}
                  </td>
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.height}
                  </td>
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.weight}
                  </td>
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.bmi}
                  </td>
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.height_category}
                  </td>
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.mass_category}
                  </td>
                  <td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.weight_category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-900">Riwayat BMI kosong</p>
      )}
    </>
  );
};


export default HistoryTable