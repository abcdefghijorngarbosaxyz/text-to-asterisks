import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
  }

  function shuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  function convertToAsterisks(paragraph: string, percentage: number): string {
    const words = paragraph.split(" ");

    const indices = [...Array(words.length).keys()];

    const shuffledIndices = shuffle(indices);

    for (let i = 0; i < shuffledIndices.length; i++) {
      if (i <= Math.ceil((words.length * percentage) / 100)) {
        const word = words[shuffledIndices[i]];
        const nonLetterRegex = /[^a-zA-Z]$/;
        if (!nonLetterRegex.test(word)) {
          words[shuffledIndices[i]] = "*".repeat(word.length);
        }
      }
    }

    return words.join(" ");
  }

  return (
    <div className="w-screen min-h-screen flex flex-col p-8 bg-gradient-to-r from-blue-400 to-sky-700">
      <div className="h-16 w-full items-center">
        <button
          onClick={() =>
            setOutputValue(convertToAsterisks(inputValue, percentage))
          }
          className="bg-white/90 select-none hover:bg-white/75 text-sky-700 font-bold py-2 px-4 rounded"
        >
          Convert
        </button>
        <input
          name="percentage"
          type="number"
          className="bg-gray-200 w-24 rounded border border-gray-400 px-4 py-2 ml-4"
          value={percentage}
          onChange={(event) => setPercentage(parseInt(event.target.value, 10))}
        />
        <label htmlFor="percentage" className="select-none pl-4 text-white">
          Mask percentage
        </label>
      </div>
      <div className="max-md:flex-col flex w-full h-full">
        <textarea
          placeholder="Paste your paragraph here..."
          className="flex-grow-1 w-full rounded border min-h-[80vh] border-gray-400 px-4 py-2"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="w-8 max-md:h-8 h-full" />
        <textarea
          placeholder="***** your ********* here..."
          className="flex-grow-1 w-full rounded border min-h-[80vh] border-gray-400 px-4 py-2"
          value={outputValue}
        />
      </div>
      <div className="fixed select-none bottom-2 right-2 text-xs text-black/75">
        made by: Yorun Gar
      </div>
    </div>
  );
}

export default App;
