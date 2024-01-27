import { useContext, useState } from "react";
import { BMIContext } from "../../contexts/BmiContext";
import HistoryTable from "./HistoryTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ZScoreLengthChart, ZScoreWeightChart } from "./zScoreChart";

const BMICalculator = () => {
  const { bmiList, addBMIEntry } = useContext(BMIContext);
  const [selectedViewOption, setSelectedViewOption] = useState("Riwayat Status Gizi (Semua)");
  

  const [formBmiState, setFormBmiState] = useState({
    child_name: "",
    age_text: "",
    height: "",
    weight: "",
    weight_category: "",
    gender: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [namaError, setNamaError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [tinggiError, setTinggiError] = useState("");
  const [beratError, setBeratError] = useState("");

  const handleSelectViewChange = (e) => {
    setSelectedViewOption(e.target.value);
    // You can add additional logic based on the selected option if needed
  };

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
    const { child_name, age_text, height, weight, gender } =
      formBmiState;
    const tinggiNum = parseInt(height);
    const beratNum = parseInt(weight);

    if (child_name === "") {
      setNamaError("Mohon isi data dengan nama");
    } else {
      setNamaError("");
    }

    if (age_text === "") {
      setAgeError("Mohon pilih tanggal lahir");
    } else {
      setAgeError("");
    }

    if (gender === "") {
      setGenderError("Mohon pilih jenis kelamin");
    } else {
      setGenderError("");
    }

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

    if (tinggiNum > 0 && beratNum > 0 && child_name != "" && age_text != "" && gender != "") {
      const newBMIEntry = {
        // id: currentUser.username,
        child_name: formBmiState.child_name,
        age_text: formBmiState.age_text,
        gender: formBmiState.gender,
        height: formBmiState.height,
        weight: formBmiState.weight,
      };

      addBMIEntry(newBMIEntry);
    }
  };

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 5);

  return (
    <>
      <section className="justify-center sm:p-8 sm:px-24">
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 bg-teal-400 rounded-lg p-4 gap-4 md:p-6">
          <div className=" flex flex-col max-w-full rounded-lg">
            <div className="space-y-4">
              <form className="space-y-3 md:space-y-4 bg-white p-4 rounded-lg">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-xl">
                  Kalkulator Status Gizi
                </h1>
                <div>
                  <p
                    className="block mb-2 text-sm font-medium text-gray-900"
                    id="pilihBalita"
                  >
                    Pilih Balita Anda (Jika Ada)
                  </p>
                  <select
                    id="selectChild"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={formBmiState.child_name}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (selectedValue === "") {
                        setFormBmiState({
                          ...formBmiState,
                          gender: "",
                          child_name: "",
                        });
                      } else {
                        const selectedBmi = bmiList.find((bmi) => bmi.child_name === selectedValue);
                        setFormBmiState({
                          ...formBmiState,
                          gender: selectedBmi.gender,
                          child_name: selectedBmi.child_name,
                        });
                      }
                    }}
                    disabled={bmiList.length === 0}
                  >
                    <option value="">Pilih Balita</option>
                    {[...new Set(bmiList.map((bmi) => bmi.child_name))].map((uniqueChildName) => (
                      <option key={uniqueChildName} value={uniqueChildName}>
                        {uniqueChildName}
                      </option>
                    ))}
                  </select>
                </div>
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
                    onChange={(e) => {
                        setFormBmiState({
                          ...formBmiState,
                          child_name: e.target.value,
                        })
                        const selectedBmi = bmiList.find((bmi) => bmi.child_name === formBmiState.child_name);
                        setFormBmiState({
                          ...formBmiState,
                          gender: selectedBmi.gender,
                        });
                      }
                    }
                  />
                  <span id="namaError" style={{ color: "red" }}>
                    {namaError}
                  </span>
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
                      minDate={minDate}
                      maxDate={new Date()}
                    />
                    <div className="text-md pt-1 font-medium">
                      {formBmiState.age_text}
                    </div>
                  </div>
                </div>
                <span id="ageError" style={{ color: "red" }}>
                    {ageError}
                </span>
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
                        onChange={() => {
                          const selectedBmi = bmiList.find((bmi) => bmi.child_name === formBmiState.child_name);
                          setFormBmiState({
                            ...formBmiState,
                            gender: selectedBmi ? selectedBmi.gender : "Laki-laki",
                          })
                        }
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
                        onChange={() => {
                            const selectedBmi = bmiList.find((bmi) => bmi.child_name === formBmiState.child_name);
                            setFormBmiState({
                              ...formBmiState,
                              gender: selectedBmi ? selectedBmi.gender : "Perempuan",
                            })
                          }
                        }
                      />
                      <span className="ml-2">Perempuan</span>
                    </label>
                  </div>
                  <span id="genderError" style={{ color: "red" }}>
                    {genderError}
                  </span>
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
                  <div className="p-4 bg-slate-300 rounded-xl mt-2">
                    <p className="text-slate-500">Keterangan Pengukuran Tinggi</p>
                    <li className="text-slate-500">
                      Balita usia 0-23 bulan dihitung dengan posisi
                      terlentang
                    </li>
                    <li className="text-slate-500">
                      Balita usia 24-59 bulan dihitung dengan posisi berdiri
                    </li>
                  </div>
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
                    className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 transition duration-300"
                    onClick={calculateBMI}
                  >
                    Hitung
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col max-w-full">
            <div className="space-y-4 bg-white p-4 rounded-lg">
              <select
                value={selectedViewOption}
                onChange={handleSelectViewChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="Riwayat Status Gizi (Semua)">Riwayat Status Gizi (Semua)</option>
                {[...new Set(bmiList.map((bmi) => bmi.child_name))].map((uniqueChildName) => (
                  <option key={uniqueChildName} value={`${uniqueChildName}`}>
                    Riwayat Status Gizi ({uniqueChildName})
                  </option>
                ))}
                {[...new Set(bmiList.map((bmi) => bmi.child_name))].map((uniqueChildName) => (
                  <option key={uniqueChildName} value={`${uniqueChildName}_curve`}>
                    Kurva Pertumbuhan ({uniqueChildName})
                  </option>
                ))}
              </select>
              {selectedViewOption === "Riwayat Status Gizi (Semua)" ? (
                <div className="flex flex-col overflow-x-auto">
                  <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-x-auto">
                        <HistoryTable bmiList={bmiList} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedViewOption.includes("curve") ? (
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-xl">
                    Kurva Pertumbuhan Tinggi Badan
                  </h1>
                  <ZScoreLengthChart data={bmiList.filter(
                    (bmi) => bmi.child_name === `${selectedViewOption.replace("_curve", "")}`,
                  )} />
                  <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-xl">
                    Kurva Pertumbuhan Berat Badan
                  </h1>
                  <ZScoreWeightChart data={bmiList.filter(
                    (bmi) => bmi.child_name === `${selectedViewOption.replace("_curve", "")}`,
                  )} />
                </div>
              ) : (
                <div className="flex flex-col overflow-x-auto">
                  <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-x-auto">
                        <HistoryTable bmiList={bmiList.filter(
                          (bmi) => bmi.child_name === selectedViewOption,
                        )} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BMICalculator;
