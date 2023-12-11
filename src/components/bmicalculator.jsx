import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BMIContext } from "../contexts/BmiContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BmiCalculator = () => {
  const { currentUser } = useContext(AuthContext);
  const { bmiList, addBMIEntry } = useContext(BMIContext);

  const [formBmiState, setFormBmiState] = useState({
    child_name: "",
    age_text: "",
    height: "",
    weight: "",
    weight_category: "",
    gender: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [bmi, setbmi] = useState();
  const [tinggiError, setTinggiError] = useState("");
  const [beratError, setBeratError] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const currentDate = new Date();
    const selectedDateOfBirth = new Date(date);
    const ageDiff = Math.floor(
      (currentDate - selectedDateOfBirth) / (1000 * 60 * 60 * 24 * 30.44),
    );
    const years = Math.floor(ageDiff / 12);
    const months = ageDiff % 12;
    const ageBabyText =
      years !== 0 ? `${years} tahun ${months} bulan` : `${months} bulan`;
    setFormBmiState({ ...formBmiState, age_text: ageBabyText });
  };

  const calculateBMI = (event) => {
    event.preventDefault();
    const { child_name, age_text, height, weight, weight_category, gender } =
      formBmiState;
    const tinggiNum = parseInt(height);
    const beratNum = parseInt(weight);

    if (isNaN(tinggiNum) || tinggiNum <= 0) {
      setTinggiError("Mohon isi data dengan angka");
    } else {
      setTinggiError("");
    }

    if (isNaN(beratNum) || beratNum <= 0) {
      setBeratError("Mohon isi data dengan angka");
    } else {
      setBeratError("");
    }

    if (tinggiNum > 0 && beratNum > 0) {
      const bmi = (beratNum / (((tinggiNum / 100) * tinggiNum) / 100)).toFixed(
        2,
      );

      let weight_category = "";
      if (bmi <= 18.4) {
        weight_category = "Underweight";
      } else if (bmi >= 18.6 && bmi < 24.9) {
        weight_category = "Normal";
      } else if (bmi >= 25 && bmi < 29.9) {
        weight_category = "Overweight";
      } else {
        weight_category = "Obesity";
      }

      let weight_categoryWomen = "";
      if (gender === "Perempuan") {
        if (bmi <= 18.4) {
          weight_categoryWomen = "Underweight";
        } else if (bmi >= 18.5 && bmi < 23.9) {
          weight_categoryWomen = "Normal";
        } else if (bmi >= 24 && bmi < 28.9) {
          weight_categoryWomen = "Overweight";
        } else {
          weight_categoryWomen = "Obesity";
        }
      }

      const finalCategory =
        gender === "Perempuan" ? weight_categoryWomen : weight_category;

      setFormBmiState({ ...formBmiState, weight_category: finalCategory });
      setbmi(bmi);

      const newBMIEntry = {
        // id: currentUser.username,
        child_name: formBmiState.child_name,
        age_text: formBmiState.age_text,
        gender: formBmiState.gender,
        height: formBmiState.height,
        weight: formBmiState.weight,
        bmi,
        weight_category: finalCategory,
      };

      addBMIEntry(newBMIEntry);
    }
  };

  return (
    <>
      <section className="justify-center sm:p-8 sm:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-teal-400 rounded-lg p-4 gap-4 md:p-6">
          <div className=" flex flex-col max-w-md md:max-w-full rounded-lg">
            <div className="space-y-4">
              <form className="space-y-3 md:space-y-4 bg-white p-4 rounded-lg">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-xl">
                  Kalkulator Status Gizi
                </h1>
                <div>
                  <p
                    className="block mb-2 text-sm font-medium text-gray-900"
                    id="masukanNama"
                  >
                    Nama Balita
                  </p>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    type="text"
                    placeholder="Andi Law"
                    value={formBmiState.child_name}
                    onChange={(e) =>
                      setFormBmiState({
                        ...formBmiState,
                        child_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <h2>Tanggal Lahir:</h2>
                  <div>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="Pilih Tanggal"
                      className="p-2 rounded-md"
                    />
                    <span className="text-md pt-1 font-medium">
                      {formBmiState.age_text}
                    </span>
                  </div>
                </div>

                <div>
                  <p
                    className="block mb-2 text-sm font-medium text-gray-900"
                    id="jenisKelamin"
                  >
                    Jenis Kelamin
                  </p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="Laki-laki"
                        checked={formBmiState.gender === "Laki-laki"}
                        onChange={() =>
                          setFormBmiState({
                            ...formBmiState,
                            gender: "Laki-laki",
                          })
                        }
                      />
                      <span className="ml-2">Laki-laki</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="Perempuan"
                        checked={formBmiState.gender === "Perempuan"}
                        onChange={() =>
                          setFormBmiState({
                            ...formBmiState,
                            gender: "Perempuan",
                          })
                        }
                      />
                      <span className="ml-2">Perempuan</span>
                    </label>
                  </div>
                </div>
                <div>
                  <p
                    className="block mb-2 text-sm font-medium text-gray-900"
                    id="tinggiBadan"
                  >
                    Masukkan tinggi badan anak (CM)
                  </p>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    type="number"
                    value={formBmiState.height}
                    onChange={(e) =>
                      setFormBmiState({
                        ...formBmiState,
                        height: e.target.value,
                      })
                    }
                    placeholder="73"
                  />
                  <span id="tinggiError" style={{ color: "red" }}>
                    {tinggiError}
                  </span>
                  <p className="text-gray-900">keterangan :</p>
                  <li>
                    untuk balita usia 0-23 bulan , hitung dengan posisi
                    terlentang
                  </li>
                  <li>
                    untuk balita usia 24-59 bulan , hitung dengan posisi berdiri
                  </li>
                </div>
                <div>
                  <p
                    className="block mb-2 text-sm font-medium text-gray-900"
                    id="beratBadan"
                  >
                    Masukkan berat badan anak (KG)
                  </p>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    type="number"
                    value={formBmiState.weight}
                    onChange={(e) =>
                      setFormBmiState({
                        ...formBmiState,
                        weight: e.target.value,
                      })
                    }
                    placeholder="9"
                  />
                  <span id="beratError" style={{ color: "red" }}>
                    {beratError}
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={calculateBMI}
                  >
                    Hitung
                  </button>
                </div>
              </form>
            </div>
            <div>
              {bmi && (
                <div className="p-4 bg-slate-300 my-6 rounded-xl">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Hasil:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Nama: {formBmiState.child_name}</li>
                    <li>Usia: {formBmiState.age_text}</li>
                    <li>Jenis Kelamin: {formBmiState.gender}</li>
                    <li>Hasil: {bmi}</li>
                    <li>Kategori: {formBmiState.weight_category}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col max-w-md md:max-w-full">
            <div className="space-y-4 bg-white p-4 rounded-lg">
              <h1 className="text-lg font-bold text-center leading-tight tracking-tight md:text-xl">
                Riwayat Status Gizi
              </h1>
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
                          Hasil
                        </th>
                        <th className="border-b border-gray-500 md:px-4 px-1">
                          Kategori
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bmiList.map((bmi) => (
                        <tr key={bmi.id} className="text-sm text-gray-900">
                          <td className="border-b border-gray-500 md:px-4 px-1 py-2 ">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
