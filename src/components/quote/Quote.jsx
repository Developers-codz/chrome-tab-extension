import { useEffect, useState } from "react";
export const Quote = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [author, showAuthor] = useState(false);
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let item = data[Math.floor(Math.random() * data.length)];
        setQuote((prevVal) => ({
          ...prevVal,
          text: item.text,
          author: item.author,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{ textAlign: "center", width: "60vw" }}
      onMouseOver={() => showAuthor(true)}
      onMouseLeave={() => showAuthor(false)}
    >
      <div className="font-xxs">
        <q>{quote.text}</q>
      </div>
      {author && <div>{quote.author}</div>}
    </div>
  );
};
