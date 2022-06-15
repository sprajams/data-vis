import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

function Data() {
  const [data, setData] = useState([]);
  const [dataObj, setDataObj] = useState({});

  const fetchData = () => {
    fetch(
      "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
    )
      .then((res) => res.text())
      .then((data) =>
        // data received as plain text, convert into an array of integers, ignore last element of array since it's NaN
        setData(() => {
          return data
            .split("\n")
            .map((x) => {
              return parseInt(x);
            })
            .slice(0, -1);
        })
      );
  };
  useEffect(() => {
    // sort data from lower to highest
    data.sort((a, b) => a - b);
    // create an object to keep track of how many duplicates are in the data array
    const obj = {};
    data.forEach((x) => {
      if (obj[x]) {
        obj[x] += 1;
      } else {
        obj[x] = 1;
      }
    });
    setDataObj(obj);
  }, [data]);

  console.log(dataObj);

  return (
    <div>
      <button onClick={fetchData}>Give Data</button>
      <div className={styles.axis}></div>
    </div>
  );
}

export default Data;
