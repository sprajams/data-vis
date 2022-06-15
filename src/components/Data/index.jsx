import { useState } from "react";

function Data() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(
      "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
    )
      .then((res) => res.text())
      .then((data) =>
        // data received as plain text, convert into an array of intergers
        setData(() => {
          return data.split("\n").map((x) => parseInt(x));
        })
      );
  };

  return (
    <div>
      <button onClick={fetchData}>Give Data</button>
    </div>
  );
}

export default Data;
