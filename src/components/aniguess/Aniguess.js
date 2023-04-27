import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./Aniguess.module.scss"

function AniEntry({ children, className, entry }) {
  return (
    <div className={classes["entry"] + " " + className}>
      <div className={classes["anititle"]}>
        <h1>{entry.title}</h1>
      </div>
      <div className={classes["anisynopsis"]}>
        <p>{entry.synopsis}</p>
      </div>
      {children}
    </div>
  );
}

export default function Aniguess({score, setScore}) {
  const [entries, setEntries] = useState([])
  const [reveal, setReveal] = useState(false)
  const [round, setRound] = useState(0)
  const cachedEntries = useRef([])
  const finishedCaching = useRef(false)

  async function getRandomAniEntry() {
    console.log("OK")
    let json = {data: {}}

    while(!json.data["score"]) {
      const res = await fetch("https://api.jikan.moe/v4/random/anime")
      json = await res.json()
    }
    
    return json
  }

  useEffect(() => {
    async function fetchEntries() {
      if(cachedEntries.current.length === 0 && !finishedCaching.current) {
        finishedCaching.current = true;
        cachedEntries.current = [await getRandomAniEntry(), await getRandomAniEntry()]
      }
      setEntries(cachedEntries.current);
      cachedEntries.current = [cachedEntries.current[1], await getRandomAniEntry()]
    }
    fetchEntries()
  }, [round]);

  function revealEntry(answer) {
    const firstEntry = entries[0]?.data
    const secondEntry = entries[1]?.data

    if(!firstEntry || !secondEntry) return;
    if(!firstEntry["score"] || !secondEntry["score"]) return;

    setReveal(true)

    setTimeout(() => {
      setReveal(false)
      const firstScore = parseFloat(firstEntry["score"])
      const secondScore = parseFloat(secondEntry["score"])
      console.log(firstScore, secondScore);
      if(answer === "Higher") {
        if(firstScore <= secondScore) {
          console.log("YES")
          setScore(score + 1);
        }
      } else {
        if(firstScore >= secondScore) {
          console.log("YES")
          setScore(score + 1);
        }
      }
      return setRound(round + 1)
    }, 2000);
  }

  const firstEntry = entries[0]?.data
  const secondEntry = entries[1]?.data

  return (
    <div className={classes["aniguess"]}>
      {firstEntry ?
        <AniEntry entry={firstEntry} className={classes["left-panel"]}>
          <div className={classes["anicontent"]}>
            <h1>Ranking: {firstEntry.score}</h1>
          </div>
        </AniEntry>
        : null}
      {secondEntry ?
        <AniEntry entry={secondEntry} className={classes["right-panel"]}>
          {reveal ?
            <div className={classes["anicontent"]}>
              <h1>Ranking: {secondEntry.score}</h1>
            </div>
            :
            <div className={classes["anicontent"]}>
              <Button variant="primary" onClick={() => revealEntry("Higher")}>Higher</Button>
              <Button variant="primary" onClick={() => revealEntry("Lower")}>Lower</Button>
            </div>
          }
        </AniEntry>
        : null}
      
    </div>
  );
}


