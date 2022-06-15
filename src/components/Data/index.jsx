import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

function Data() {
  const [rawData, setrawData] = useState([]);
  const [data, setdata] = useState([]);

  // fetch new data only on page load/refresh
  useEffect(() => {
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
  }, []);
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
      value: obj[key],
    }));
    setdata(result);
  }, [rawData]);
  console.log(data);

  return (
    <div className={styles.outer}>
      <div className={styles.axis}>
        <div className={styles.axisY}>
          <div>30</div>
          <div>20</div>
          <div>10</div>
          <div>0</div>
        </div>
        {data.map((x) => {
          return (
            <div className={styles.bar} style={{ height: `${x.value * 15}px` }}>
              <div>{x.value}</div>
              <div className={styles.axisX}> {x.id} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Data;
