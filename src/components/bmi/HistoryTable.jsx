import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

/* eslint-disable react/prop-types */
const HistoryTable = ({ bmiList }) => {
  return (
    <>
      {bmiList.length > 0 ? (
          <Table className="w-screen border-collapse">
            <Thead className="text-md text-left font-medium text-gray-900">
              <Tr>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  Nama
                </Th>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  Umur
                </Th>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  TB
                </Th>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  BB
                </Th>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  IMT
                </Th>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  Kategori TB/U
                </Th>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  Kategori BB/U
                </Th>
                <Th className="border-b border-gray-500 md:px-4 px-1">
                  Kategori IMT/U
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {bmiList.map((bmi) => (
                <Tr key={bmi.id} className="text-sm text-gray-900">
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.child_name}
                  </Td>
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.age_text}
                  </Td>
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.height}
                  </Td>
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.weight}
                  </Td>
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.bmi}
                  </Td>
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.height_category}
                  </Td>
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.mass_category}
                  </Td>
                  <Td className="border-b border-gray-500 md:px-4 px-1 py-2">
                    {bmi.weight_category}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
      ) : (
        <p className="text-gray-900">Riwayat BMI kosong</p>
      )}
    </>
  );
};


export default HistoryTable