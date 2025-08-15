import React from "react";

interface Props {
  text: string;
  day: (day: string) => void;
}

const Day: React.FC<Props> = ({ text, day }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    day(e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-2 mt-2">
      <label htmlFor="appointment-day" className="text-gray-700 font-semibold">
        {text}
      </label>
      <input
        id="appointment-day"
        type="date"
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 hover:border-green-400"
      />
    </div>
  );
};

export default Day;
