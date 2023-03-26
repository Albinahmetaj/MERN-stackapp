import React from "react";

const arrayObjOne = [
  { display: ["Stockholm", "Copenhagen", "Berlin"] },
  { display: ["Stockholm", "Copenhagen", "Berlin", "Oslo"] },
  { display: ["Stockholm", "Copenhagen", "Berlin", "Prag"] },
  { display: ["Stockholm", "Copenhagen", "Berlin", "Oslo"] },
];

function Testpage() {
  const results = arrayObjOne
    .map((a) => a.display)
    .flat()
    .filter(
      (item, index, currentArray) =>
        currentArray.lastIndexOf(item) === index &&
        currentArray.indexOf(item) === index
    );
  console.log(results);
  return (
    <div>
      <ul>
        <li>
          {arrayObjOne
            .map((a) => a.display)
            .flat()
            .filter(
              (item, index, currentArray) =>
                currentArray.lastIndexOf(item) === index &&
                currentArray.indexOf(item) === index
            )}
        </li>
      </ul>
    </div>
  );
}

export default Testpage;
