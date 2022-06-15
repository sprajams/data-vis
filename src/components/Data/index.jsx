import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

function Data() {
  const [rawData, setrawData] = useState([]);
  const [data, setdata] = useState([]);

  const fetchData = () => {
    fetch(
      "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
    )
      .then((res) => res.text())
      .then((data) =>
        // data received as plain text, convert into an array of integers, ignore last element of array since it's NaN
        setrawData(() => {
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
    rawData.sort((a, b) => a - b);
    // create an object to keep track of how many duplicates are in the data array
    const obj = {};
    rawData.forEach((x) => {
      if (obj[x]) {
        obj[x] += 1;
      } else {
        obj[x] = 1;
      }
    });
    // turn object into an array of individual objects
    const result = Object.keys(obj).map((key) => ({
      id: parseInt(key),
      name: obj[key],
    }));
    setdata(result);
  }, [rawData]);
  console.log(data);

  return (
    <div className={styles.outer}>
      <button onClick={fetchData}>Give Data</button>
      <div className={styles.axis}></div>
    </div>
  );
}

export default Data;
