import React, { useState, useMemo, useReducer, useCallback } from "react";
import "./App.css";

function useCharacterCount(initialState = "", charLimit) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_TEXT":
        if (action.payload.length <= charLimit) {
          return action.payload;
        } else {
          return state;
        }
      default:
        return state;
    }
  };

  const [text, dispatch] = useReducer(reducer, initialState);
  const charCount = useMemo(() => text.length, [text]);

  const updateText = useCallback(
    (newText) => {
      dispatch({ type: "UPDATE_TEXT", payload: newText });
    },
    [dispatch]
  );
  return {
    text,
    charCount,
    updateText,
  };
}

function TextAreaApp() {
  const charLimit = 500;
  const { text, charCount, updateText } = useCharacterCount("", charLimit);
  const progress = (text.length / charLimit) * 100;

  // const handleCharCount = useCallback((e) => {
  //   setCharCount(e.target.value.length);
  // }, []);

  // const handletextarea = useCallback((e) => {
  //   setQuery(e.target.value);
  // }, []);

  const handleChange = useCallback(
    (e) => {
      updateText(e.target.value);
    },
    [updateText]
  );
  return (
    <div className="text-area-container">
      <textarea
        type="text"
        value={text}
        placeholder="please input your text here"
        maxLength={charLimit}
        onChange={handleChange}
      />
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${progress}% `,
            backgroundColor: progress <= 90 ? "green" : "red",
          }}
        >
          <span className="percentageDesplay">{progress}%</span>
        </div>
      </div>

      <p>
        Character Count: {charCount}/{charLimit}
      </p>
    </div>
  );
}

export default TextAreaApp;
