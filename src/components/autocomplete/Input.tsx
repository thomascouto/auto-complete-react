import { useState, useEffect, ChangeEvent, memo } from "react";
import dataFetcher from "./dataFetcher";
import InputSuggestions from "./InputSuggestions";

function Input() {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionList, setSuggestionList] = useState<JsonResult[]>([]);

  useEffect(() => {
    if (showSuggestions) dataFetcher(inputValue).then(handleSuggestionsContent);
  }, [showSuggestions, inputValue]);

  const clearSuggestions = () => {
    setShowSuggestions(false);
    setSuggestionList([]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length) {
      setShowSuggestions(true);
      return;
    }

    clearSuggestions();
  };

  const handleSuggestionsContent = (dataSet: JsonResult[]) => setSuggestionList(dataSet);
  const suggestionsClick = (value: string) => {
    setInputValue(value);
    clearSuggestions();
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter" && suggestionList?.length) {
      suggestionsClick(suggestionList[0].description);
      clearSuggestions();
    }
  };

  return (
    <>
      <input
        onKeyDown={({ key }) => handleKeyDown(key)}
        type={"text"}
        value={inputValue}
        onChange={handleChange}
        placeholder={"Search"}
      />
      {suggestionList.length > 0 && (
        <InputSuggestions
          searchTerm={inputValue}
          list={suggestionList}
          onSugestionClick={suggestionsClick}
        />
      )}
    </>
  );
}

export default memo(Input);
