import { useCallback } from "react";
import ListItem from "./ListItem";

function InputSuggestions({ onSugestionClick, list, searchTerm }: SuggestionsProps) {
  const handleSuggestionsClick = useCallback(
    (value: string) => {
      onSugestionClick(value);
    },
    [onSugestionClick]
  );

  const makeHighLight = useCallback(
    (value: string) => {
      return value.toLowerCase().replaceAll(searchTerm, `<u>${searchTerm}</u>`);
    },
    [searchTerm]
  );

  return (
    <ul>
      {list.map(({ description }, i: number) => (
        <li key={i} onClick={() => handleSuggestionsClick(description)}>
          <ListItem itemValue={makeHighLight(description)} />
        </li>
      ))}
    </ul>
  );
}

export default InputSuggestions;
