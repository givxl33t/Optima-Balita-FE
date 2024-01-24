import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer, Label } from 'recharts';
import BoysLengthZScores from './data/boysLengthZScoreDataset';
import GirlsLengthZScores from './data/girlsLengthZScoreDataset';
import BoysWeightZScores from './data/boysWeightZScoreDataset';
import GirlsWeightZScores from './data/girlsWeightZScoreDataset';

const convertAgeToMonth = (ageText) => {
  const matchWithYears = ageText.match(/(\d+)\s*tahun\s*(\d*)\s*bulan/);
  const matchWithoutYears = ageText.match(/(\d+)\s*bulan/);

  if (matchWithYears) {
    const years = parseInt(matchWithYears[1], 10);
    const months = parseInt(matchWithYears[2], 10);
    return years * 12 + months;
  } else if (matchWithoutYears) {
    const months = parseInt(matchWithoutYears[1], 10);
    return months;
  }
};

export const ZScoreLengthChart = (data) => {
  let zScoreData;

  const transformedData = data.data
    .map((history) => ({
      ...history,
      month: convertAgeToMonth(history.age_text),
    }))
    .sort((a, b) => a.month - b.month);

  if (data.data[0].gender === "Laki-laki") {
    zScoreData = BoysLengthZScores.map((zScore) => ({
      ...zScore,
      height: transformedData?.find((history) => history.month === zScore.Month)?.height,
    }));
  } else {
    zScoreData = GirlsLengthZScores.map((zScore) => ({
      ...zScore,
      height: transformedData?.find((history) => history.month === zScore.Month)?.height,
    }));
  }

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart data={zScoreData} margin={{ top: 10, bottom: 20 }}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="Month" >
          <Label value="Bulan" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Tinggi (cm)', angle: -90, position: 'insideLeft', offset: 20 }} domain={[0, 125]} />
        <Tooltip />
        <Line type="monotone" dataKey="SD3" stroke={data.data[0].gender === "Laki-laki" ? "#8884d8" : "#d888e4"} name="SD 3" dot={false} />
        <Line type="monotone" dataKey="SD2" stroke="#82ca9d" name="SD 2" dot={false} />
        <Line type="monotone" dataKey="SD0" stroke="#ffc658" name="SD 0" dot={false} />
        <Line type="monotone" dataKey="SD2neg" stroke={data.data[0].gender === "Laki-laki" ? "#ff0000" : "#ff8080"} name="SD -2" dot={false} />
        <Line type="monotone" dataKey="SD3neg" stroke={data.data[0].gender === "Laki-laki" ? "#0000ff" : "#cc0077"} name="SD -3" dot={false} />
        <Line type="monotone" dataKey="height" stroke="#01110a" name="Tinggi" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const ZScoreWeightChart = (data) => {
  let zScoreData;

  const transformedData = data.data
    .map((history) => ({
      ...history,
      month: convertAgeToMonth(history.age_text),
    }))
    .sort((a, b) => a.month - b.month);

  if (data.data[0].gender === "Laki-laki") {
    zScoreData = BoysWeightZScores.map((zScore) => ({
      ...zScore,
      weight: transformedData?.find((history) => history.month === zScore.Month)?.weight,
    }));
  } else {
    zScoreData = GirlsWeightZScores.map((zScore) => ({
      ...zScore,
      weight: transformedData?.find((history) => history.month === zScore.Month)?.weight,
    }));
  }

  return (
    <ResponsiveContainer width="95%" height={400} >
      <LineChart data={zScoreData} margin={{ top: 10, bottom: 20 }} >
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="Month" >
          <Label value="Bulan" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Berat (kg)', angle: -90, position: 'insideLeft', offset: 20 }} domain={[0, 30]} />
        <Tooltip />
        <Line type="monotone" dataKey="SD3" stroke={data.data[0].gender === "Laki-laki" ? "#8884d8" : "#d888e4"} name="SD 3" dot={false} />
        <Line type="monotone" dataKey="SD2" stroke="#82ca9d" name="SD 2" dot={false} />
        <Line type="monotone" dataKey="SD0" stroke="#ffc658" name="SD 0" dot={false} />
        <Line type="monotone" dataKey="SD2neg" stroke={data.data[0].gender === "Laki-laki" ? "#ff0000" : "#ff8080"} name="SD -2" dot={false} />
        <Line type="monotone" dataKey="SD3neg" stroke={data.data[0].gender === "Laki-laki" ? "#0000ff" : "#cc0077"} name="SD -3" dot={false} />
        <Line type="monotone" dataKey="weight" stroke="#01110a" name="Berat" />
      </LineChart>
    </ResponsiveContainer>
  );
};