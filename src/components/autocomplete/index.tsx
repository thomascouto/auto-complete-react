import { memo } from "react";
import Input from "./Input";

function AutoCompleteInput() {
  return (
    <div className="autocomplete-container">
      <Input />
    </div>
  );
}

export default memo(AutoCompleteInput);
